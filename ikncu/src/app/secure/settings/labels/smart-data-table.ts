// Smart DataTable
export let settings = {
  columns: {
    id: {
      title: 'ID',
      filter: false,
    },
    label: {
      title: 'Label',
      filter: true,
    }
  },
  attr: {
    class: 'table table-responsive'
  },
  edit: {
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete: {
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  }
};

export let data = [
  {
    id: 1,
    label: 'Human'
  },
  {
    id: 2,
    label: 'Person'
  },
  {
    id: 3,
    label: 'Plant'
  },
];

export let filtersettings = {
  columns: {
    id: {
      title: 'ID',
    }
  },
  attr: {
    class: 'table table-responsive'
  },
  edit: {
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete: {
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  }
};

export let filerdata = [
];

export let alertsettings = {
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  },
  add: {
    confirmCreate: true,
  },
  edit: {
    confirmSave: true,
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  columns: {
    id: {
      title: 'ID',
    },
    label: {
      title: 'Label'
    }
  },
  attr: {
    class: 'table table-responsive'
  },
};

export let alertdata = [
  {
    id: 1,
    Label: 'Leanne Graham'
  }
];
