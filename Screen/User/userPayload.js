export const userPayload = {
    update: {
        name: "", 
        email: "", 
        phone: "", 
        profile: "", 
        dob: "",
        status: ""
    },
    store: {
        name: "", 
        email: "", 
        phone: "", 
        profile: "", 
        dob: "",
        password: "",
        password_confirmation: ""
    },
    columnsName: 'userColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "profile", label: "Profile", minWidth: 100 },
        { id: "dob", label: "Dob", minWidth: 100 },
        { id: "email", label: "Email", minWidth: 120 },
        { id: "phone", label: "Phone", minWidth: 150 },

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
