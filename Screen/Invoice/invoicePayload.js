export const invoicePayload = {
    update: {
        name: "", 
        description: "",
        status: ""
    },
    store: {
        name: "", 
        description: ""
    },
    columnsName: 'invoiceColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "description", label: "Description", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },

        // { id: "created_by", label: "Created By", minWidth: 100 },
        // { id: "updated_by", label: "Updated By", minWidth: 100 },
        // { id: "created_at", label: "Created At", minWidth: 100 },
        // { id: "updated_at", label: "Updated At", minWidth: 100 },

        { id: "option", label: "Option", minWidth: 100 },
    ],
    paginateParams: {
        page: 1,
        per_page: 5,
        columns: "name,phone,email,dob,",
        search: "",
        order: "id",
        sort: "DESC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
