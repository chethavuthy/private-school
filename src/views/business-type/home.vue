<template>
  <div class="main-container">
    <TableBody ref="tableBody">
      <template #header>
        <TableHeader
          :show-filter="true"
          title="Search"
          @search="onSearch"
          @reset-search="onResetSearch"
        >
          <template #top-right>
            <AddButton @add="onAddItem" />
          </template>
          <template #search-content>
            <DataForm
              ref="searchForm"
              :form-config="{
                labelWidth: 70,
              }"
              :options="conditionItems"
              preset="grid-item"
            />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <n-data-table
          size="small"
          :loading="tableLoading"
          :data="dataList"
          :columns="tableColumns"
          :row-key="rowKey"
          :style="{ height: `${tableHeight}px` }"
          :flex-height="true"
        />
      </template>
      <template #footer>
        <TableFooter :pagination="pagination" />
      </template>
    </TableBody>
    <ModalDialog ref="modalDialog" @confirm="onDataFormConfirm" :title="title">
      <template #content>
        <DataForm ref="itemDataFormRef" :options="itemFormOptions" />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { get, post, put, del } from '@/api/http'
  import { BusinessType } from '@/api/url'
  import { renderTag, renderTreeSelect, renderRadioButtonGroup } from '@/hooks/form'
  import {
    usePagination,
    useRowKey,
    useTable,
    useTableColumn,
    useTableHeight,
    useRenderAction,
  } from '@/hooks/table'
  import { DataFormType, ModalDialogType, FormItem } from '@/types/components'
  import {
    DataTableColumn,
    NAvatar,
    NCheckbox,
    NCheckboxGroup,
    NDatePicker,
    NInput,
    NSelect,
    NSpace,
    NTimePicker,
    SelectOption,
    useMessage,
    useDialog,
  } from 'naive-ui'
  import { defineComponent, h, onMounted, ref, shallowReactive, nextTick } from 'vue'
  import { FormAction, DoneAction } from '@/types/components'
  const conditionItems: Array<FormItem> = [
    {
      key: 'filterKeyword',
      label: 'Keyword',
      value: ref(null),
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: 'Please type in filter keywords',
        })
      },
    },
  ]

  const itemFormOptions = [
    {
      key: 'title',
      label: 'Title',
      type: 'input',
      value: ref(null),
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (newVal) => {
            formItem.value.value = newVal
          },
          maxlength: 50,
          placeholder: 'Please enter the title',
        })
      },
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('Please enter the title')
          return false
        }
        return true
      },
    },
  ] as Array<FormItem>

  interface TableData {
    createdAt: string
    isDeleted: boolean
    title: string
    updatedAt: string
    _id: string
  }

  export default defineComponent({
    name: 'BusinessTypeHome',
    setup() {
      const title = ref(FormAction.ADD)
      const selectedId = ref('')
      const searchForm = ref<DataFormType | null>(null)
      const itemDataFormRef = ref<DataFormType | null>(null)
      const modalDialog = ref<ModalDialogType | null>(null)
      const pagination = usePagination(doRefresh)
      pagination.pageSize = 20
      const table = useTable<TableData>()
      const naiveDialog = useDialog()
      const message = useMessage()
      const rowKey = useRowKey('id')
      const tableColumns = useTableColumn(
        [
          // table.selectionColumn,
          table.indexColumn,
          {
            title: 'Title',
            key: 'title',
          },
          {
            title: 'Created At',
            key: 'createdAt',
            render: (rowData) => {
              return h('div', new Date(rowData.createdAt).toLocaleString())
            },
          },
          {
            title: 'Updated At',
            key: 'updatedAt',
            render: (rowData) => {
              return h('div', new Date(rowData.createdAt).toLocaleString())
            },
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (rowData) => {
              return useRenderAction([
                {
                  label: 'Edit',
                  onClick: onUpdateItem.bind(null, rowData),
                },
                {
                  label: 'Delete',
                  type: 'error',
                  onClick() {
                    onDeleteItem(rowData)
                  },
                },
              ] as TableActionModel[])
            },
          },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
      function onAddItem() {
        title.value = FormAction.ADD
        modalDialog.value?.toggle()
        nextTick(() => {
          itemDataFormRef.value?.reset()
        })
      }
      function onDataFormConfirm() {
        if (itemDataFormRef.value?.validator()) {
          const action = title.value === FormAction.ADD ? post : put
          const url =
            title.value === FormAction.ADD
              ? BusinessType.CREATE
              : `${BusinessType.UPDATE}/${selectedId.value}`

          action({
            url,
            data: itemDataFormRef.value?.generatorParams(),
          })
            .then(() => {
              message.success(`${DoneAction[title.value] || 'Operated'} successfully`)
            })
            .catch((error) => {
              message.error(error.message)
            })
            .finally(() => {
              modalDialog.value?.toggle()
              doRefresh()
            })
        }
      }
      function onUpdateItem(item: any) {
        title.value = FormAction.EDIT
        selectedId.value = item._id
        modalDialog.value?.toggle()
        nextTick(() => {
          itemFormOptions.forEach((it) => {
            const key = it.key
            const propName = item[key]
            it.value.value = propName
          })
        })
      }
      function doRefresh() {
        get({
          url: BusinessType.LIST,
          data: () => ({
            page: pagination.page,
            limit: pagination.pageSize,
            ...searchForm.value?.generatorParams(),
          }),
        })
          .then((res) => {
            table.handleSuccess(res)
            pagination.setTotalSize(res.totalSize || 10)
          })
          .catch(console.log)
      }
      const onDeleteItem = (item: any) => {
        naiveDialog.warning({
          title: FormAction.DELETE,
          content: 'Are you sure you want to delete?',
          positiveText: 'Delete',
          negativeText: 'Close',
          onPositiveClick: () => {
            del({
              url: `${BusinessType.DELETE}/${item._id}`,
            })
              .then(() => {
                message.success('Deleted successfully')
                doRefresh()
              })
              .catch((error) => {
                message.error(error.message)
              })
          },
        })
      }
      function onSearch() {
        doRefresh()
      }
      function onResetSearch() {
        searchForm.value?.reset()
      }
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight()
        doRefresh()
      })
      return {
        ...table,
        rowKey,
        pagination,
        searchForm,
        tableColumns,
        conditionItems,
        onSearch,
        onResetSearch,
        itemFormOptions,
        onDataFormConfirm,
        modalDialog,
        itemDataFormRef,
        onAddItem,
        title,
        onDeleteItem,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .avatar-container {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    vertical-align: middle;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .avatar-vip {
      border: 2px solid #cece1e;
    }
    .vip {
      position: absolute;
      top: 0;
      right: -9px;
      width: 15px;
      transform: rotate(60deg);
    }
  }
  .gender-container {
    .gender-icon {
      width: 20px;
    }
  }
</style>
