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
    <ModalDialog
      ref="modalDialog"
      @confirm="onDataFormConfirm"
      :title="title"
      contentHeight="20rem"
    >
      <template #content>
        <DataForm ref="itemDataFormRef" :options="itemFormOptions" />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { get, post, put, del } from '@/api/http'
  import { Category, Banner } from '@/api/url'
  import { renderTag, renderSwitch } from '@/hooks/form'
  import {
    usePagination,
    useRowKey,
    useTable,
    useTableColumn,
    useTableHeight,
    useRenderAction,
  } from '@/hooks/table'
  import { DataFormType, FormItem } from '@/types/components'
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
    NUpload,
    NModal,
    NImage,
    NSwitch,
    type UploadFileInfo,
  } from 'naive-ui'
  import { defineComponent, h, onMounted, computed, ref, nextTick } from 'vue'
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

  interface TableData {
    _id: string
    title: string
    permissions: string[]
    isDeleted: boolean
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
  }

  export default defineComponent({
    name: 'BannerHome',
    setup() {
      const categoryOptions = ref<SelectOption[]>([])
      const fileList = ref<UploadFileInfo[]>([])
      const title = ref(FormAction.ADD)
      const selectedId = ref('')
      const searchForm = ref<DataFormType | null>(null)
      const itemDataFormRef = ref<DataFormType | null>(null)
      const modalDialog = ref<ModalDialogType | null>(null)
      const pagination = usePagination(doRefresh)
      pagination.pageSize = 20
      const naiveDialog = useDialog()
      const table = useTable<TableData>()
      const message = useMessage()
      const rowKey = useRowKey('id')
      const itemFormOptions = computed(
        () =>
          [
            {
              key: 'name',
              label: 'Name',
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
            {
              key: 'attachmentId',
              label: 'Attachment',
              type: 'upload',
              value: ref(null),
              render: (formItem) => {
                return h(NUpload, {
                  listType: 'image-card',
                  max: 1,
                  onRemove: () => {
                    formItem.value.value = ''
                    fileList.value = []
                  },
                  fileList: fileList.value,
                  value: formItem.value.value,
                  onUpdateFileList: (newVal) => {
                    if (newVal.length === 0) return
                    customRequest({ file: newVal[0] }).then((res) => {
                      fileList.value = [
                        {
                          url: res?.data?.url,
                          status: 'finished',
                          id: res?.data?._id,
                        },
                      ]
                      formItem.value.value = res?.data?._id
                    })
                  },
                  type: 'drag',
                  accept: 'image/*',
                  placeholder: 'Please upload attachment',
                })
              },
              validator: (formItem, message) => {
                if (!formItem.value.value) {
                  message.error('Please upload attachment')
                  return false
                }
                return true
              },
            },
            {
              key: 'categoryIds',
              label: 'Categories',
              type: 'select',
              multiple: true,
              value: ref(null),
              optionItems: categoryOptions.value,
              render: (formItem) => {
                return h(NSelect, {
                  multiple: true,
                  value: formItem.value.value,
                  onUpdateValue: (newVal) => {
                    formItem.value.value = newVal
                  },
                  placeholder: 'Please select categories',
                  clearable: true,
                  options: formItem.optionItems as SelectOption[],
                })
              },
              validator: (formItem, message) => {
                if (!formItem.value.value) {
                  message.error('Please select categories')
                  return false
                }
                return true
              },
            },
            {
              key: 'isSlider',
              label: 'Is Slider',
              type: 'switch',
              value: ref(false),
              render: (formItem) => renderSwitch(formItem.value),
            },
          ] as Array<FormItem>
      )
      const tableColumns = useTableColumn(
        [
          // table.selectionColumn,
          table.indexColumn,
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Attachment',
            key: 'attachment',
            render: (rowData) =>
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  },
                },
                [
                  h(
                    NImage,
                    {
                      src: rowData?.attachment?.url,
                      fit: 'cover',
                      width: 20,
                      height: 20,
                    },
                    {}
                  ),
                ]
              ),
          },
          {
            title: 'Categories',
            key: 'categories',
            render: (rowData) =>
              h(
                NSpace,
                {
                  itemStyle: 'display: flex;',
                  justify: 'center',
                },
                {
                  default: () =>
                    rowData.categories?.map((it) =>
                      renderTag(it?.name, {
                        type: 'info',
                        size: 'small',
                      })
                    ),
                }
              ),
          },
          {
            title: 'Type',
            key: 'isSlider',
            render: (rowData) =>
              renderTag(rowData.isSlider ? 'Slider Banner' : 'Single Banner', {
                type: rowData.isSlider ? 'success' : 'warning',
              }),
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
          // {
          //   title: 'Actions',
          //   key: 'actions',
          //   render: (rowData) => {
          //     return useRenderAction([
          //       {
          //         label: 'Edit',
          //         onClick: onUpdateItem.bind(null, rowData),
          //       },
          //       {
          //         label: 'Delete',
          //         type: 'error',
          //         onClick() {
          //           onDeleteItem(rowData)
          //         },
          //       },
          //     ] as TableActionModel[])
          //   },
          // },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
      function customRequest({ file }: UploadCustomRequestOptions) {
        return new Promise((resolve, reject) => {
          const formData = new FormData()
          formData.append('file', file?.file)
          post({
            url: '/file/upload',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((res) => {
              resolve(res)
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
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
            title.value === FormAction.ADD ? Banner.CREATE : `${Banner.UPDATE}/${selectedId.value}`

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
          itemFormOptions.value.forEach((it) => {
            const key = it.key
            let propName = item[key]
            if (it.key === 'attachmentId') {
              propName = item['attachment']
              fileList.value = [
                {
                  url: propName?.url,
                  status: 'finished',
                  id: propName?._id,
                },
              ]
            } else if (it.key === 'categoryIds') {
              propName = item['categories']
              it.value.value = propName.map((it: any) => it._id)
            } else {
              it.value.value = propName
            }
          })
        })
      }
      function doRefresh() {
        get({
          url: Banner.LIST,
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
              url: `${Banner.DELETE}/${item._id}`,
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
        categoryOptions,
        fileList,
      }
    },
    async created() {
      get({
        url: Category.LIST,
      })
        .then((res) => {
          this.categoryOptions = res?.data?.map((it) => ({
            label: it?.name,
            value: it._id,
          }))
        })
        .catch(console.log)
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
