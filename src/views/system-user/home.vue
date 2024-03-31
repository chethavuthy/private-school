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
  </div>
</template>

<script lang="ts">
  import { get } from '@/api/http'
  import { SystemUser } from '@/api/url'
  import { renderTag } from '@/hooks/form'
  import { usePagination, useRowKey, useTable, useTableColumn, useTableHeight } from '@/hooks/table'
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
  } from 'naive-ui'
  import { defineComponent, h, onMounted, ref } from 'vue'
  const conditionItems: Array<FormItem> = [
    {
      key: 'name',
      label: 'Name',
      value: ref(null),
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: 'Please type in name',
        })
      },
    },
    {
      key: 'status',
      label: 'Status',
      value: ref(null),
      optionItems: [
        {
          label: 'Approve',
          value: 0,
        },
        {
          label: 'Reject',
          value: 1,
        },
      ],
      render: (formItem) => {
        return h(NSelect, {
          options: formItem.optionItems as Array<SelectOption>,
          value: formItem.value.value,
          placeholder: 'Please select status',
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
        })
      },
    },
    {
      key: 'date',
      label: 'Date',
      value: ref(null),
      render: (formItem) => {
        return h(NDatePicker, {
          value: formItem.value.value,
          placeholder: 'Please select the date',
          style: 'width: 100%',
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          type: 'date',
        })
      },
    },
    {
      key: 'time',
      label: 'Time',
      value: ref(null),
      render: (formItem) => {
        return h(NTimePicker, {
          options: formItem.optionItems as Array<SelectOption>,
          value: formItem.value.value,
          placeholder: 'Please select time',
          style: 'width: 100%',
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
        })
      },
    },
    // {
    //   key: 'checkbox',
    //   label: '复选',
    //   value: ref(null),
    //   optionItems: [
    //     {
    //       label: '选项1',
    //       value: 0,
    //     },
    //     {
    //       label: '选项2',
    //       value: 1,
    //     },
    //   ],
    //   render: (formItem) => {
    //     return h(
    //       NCheckboxGroup,
    //       {
    //         options: formItem.optionItems as Array<SelectOption>,
    //         value: formItem.value.value,
    //         placeholder: '请选择用户姓别',
    //         onUpdateValue: (val) => {
    //           formItem.value.value = val
    //         },
    //       },
    //       {
    //         default: () => {
    //           return h(
    //             NSpace,
    //             {
    //               itemStyle: 'display: flex;',
    //             },
    //             {
    //               default: () => {
    //                 return formItem.optionItems?.map((it) => {
    //                   return h(NCheckbox, {
    //                     key: it.value,
    //                     label: it.label,
    //                     value: it.value,
    //                   })
    //                 })
    //               },
    //             }
    //           )
    //         },
    //       }
    //     )
    //   },
    // },
  ]

  interface TableData {
    _id: string
    fullName: string
    email: string
    role: {
      _id: string
      title: string
      permissions: string[]
      isDeleted: boolean
      isDefault: boolean
      createdAt: string
      updatedAt: string
    }
    isDeleted: boolean
    isDefault: boolean
    createdAt: string
    updatedAt: string
  }

  export default defineComponent({
    name: 'SystemUserHome',
    setup() {
      const searchForm = ref<DataFormType | null>(null)
      const pagination = usePagination(doRefresh)
      pagination.pageSize = 20
      const table = useTable<TableData>()
      const message = useMessage()
      const rowKey = useRowKey('id')
      const tableColumns = useTableColumn(
        [
          table.selectionColumn,
          table.indexColumn,
          {
            title: 'Full Name',
            key: 'fullName',
          },
          {
            title: 'Email',
            key: 'email',
          },
          {
            title: 'Role',
            key: 'role',
            render: (rowData) => {
              return h('div', rowData.role.title)
            },
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
          //   title: 'Status',
          //   key: 'status',
          //   width: 80,
          //   render: (rowData) => {
          //     return h('div', rowData.gender === 0 ? 'Approve' : 'Reject')
          //   },
          // },
          // {
          //   title: '头像',
          //   key: 'avatar',
          //   render: (rowData: any) => {
          //     return h(
          //       NAvatar,
          //       {
          //         circle: true,
          //         size: 'small',
          //       },
          //       { default: () => rowData.nickName.substring(0, 1) }
          //     )
          //   },
          // },
          // {
          //   title: '地址',
          //   key: 'address',
          // },
          // {
          //   title: '名称',
          //   key: 'nickName',
          // },
          // {
          //   title: '上次登录时间',
          //   key: 'lastLoginTime',
          //   width: 180,
          // },
          // {
          //   title: '上次登录IP',
          //   key: 'lastLoginIp',
          // },
          // {
          //   title: 'Status',
          //   key: 'status',
          //   render: (rowData) =>
          //     renderTag(!!rowData.status ? 'Approve' : 'Reject', {
          //       type: !!rowData.status ? 'success' : 'error',
          //       size: 'small',
          //     }),
          // },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
      function doRefresh() {
        get({
          url: SystemUser.LIST,
          data: () => ({
            page: pagination.page,
            limit: pagination.pageSize,
          }),
        })
          .then((res) => {
            table.handleSuccess(res)
            pagination.setTotalSize(res.totalSize || 10)
          })
          .catch(console.log)
      }
      function onSearch() {
        message.success('Params: ' + JSON.stringify(searchForm.value?.generatorParams()))
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
