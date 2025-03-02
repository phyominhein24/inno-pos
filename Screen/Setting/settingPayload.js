export const settingPayload = {
    update: {
        key: "", 
        value: "", 
        description: "", 
        status: ""
    },
    store: {
        key: "", 
        value: "", 
        description: "",
        status: ""
    },
    columnsName: 'settingColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "key", label: "Key", minWidth: 100 },
        { id: "value", label: "Value", minWidth: 150 },
        { id: "description", label: "Description", minWidth: 200 },
        { id: "status", label: "Status", minWidth: 100 },
        { id: "option", label: "Option", minWidth: 100 },
    ],
    paginateParams: {
        page: 1,
        per_page: 5,
        columns: "key,value,description,status",
        search: "",
        order: "id",
        sort: "DESC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
