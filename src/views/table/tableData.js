export const data_empty = {
  headers: [],
  items: []
}

export const data_normal = {
  headers: [
    { text: 'col1', value: 'h1ValueKey' },
    { text: 'col2', value: 'h2ValueKey' },
    { text: 'col3', value: 'h3ValueKey' }
  ],
  items: []
}

export const data_expanded = {
  headers: [
    { text: 'col1', value: 'h1ValueKey' },
    { text: 'col2', value: 'h2ValueKey' },
    { text: 'col3', value: 'h3ValueKey' },
    { text: 'col4', value: 'h4ValueKey' }
  ],
  items: [
    { h1ValueKey: '1', h2ValueKey: 'col1-2', h3ValueKey: 'col1-3', h4ValueKey: 'col1-4' },
    { h1ValueKey: '2', h2ValueKey: 'col2-2', h3ValueKey: 'col2-3', h4ValueKey: 'col2-4' },
    { h1ValueKey: '3', h2ValueKey: 'col3-2', h3ValueKey: 'col3-3', h4ValueKey: 'col3-4' }
  ]
}
export const data_select = {
  headers: [
    { text: 'col1', value: 'h1ValueKey' },
    { text: 'col2', value: 'h2ValueKey' },
    { text: 'col3', value: 'h3ValueKey' },
    { text: 'col4', value: 'h4ValueKey' }
  ],
  items: [
    { h1ValueKey: '1', h2ValueKey: 'col1-2', h3ValueKey: 'col1-3', h4ValueKey: 'col1-4' },
    { h1ValueKey: '2', h2ValueKey: 'col2-2', h3ValueKey: 'col2-3', h4ValueKey: 'col2-4' },
    { h1ValueKey: '3', h2ValueKey: 'col3-2', h3ValueKey: 'col3-3', h4ValueKey: 'col3-4' }
  ]
}

export const data_RER = {
  tablesColName: 'RER',
  headers: [
    [
      {
        colspan: 1,
        headerGroup: '1',
        seq: 1,
        tableSeq: 1,
        prName: 'REB',
        rowspan: 2,
        text: '業務來源',
        value: 'aaa',
        uuid: '1'
      },
      {
        colspan: 2,
        headerGroup: '1',
        seq: 2,
        tableSeq: 1,
        prName: 'REB',
        rowspan: 1,
        text: '核保',
        value: '',
        uuid: '2'
      },
      {
        colspan: 1,
        headerGroup: '1',
        seq: 3,
        tableSeq: 1,
        prName: 'REB',
        rowspan: 2,
        text: '會辦',
        value: 'ccc',
        uuid: '4'
      }
    ],
    [
      {
        colspan: 1,
        headerGroup: '2',
        seq: 1,
        tableSeq: 1,
        prName: 'REB',
        rowspan: 1,
        text: '已處理',
        value: 'ddd',
        uuid: '5'
      },
      {
        colspan: 1,
        headerGroup: '2',
        seq: 2,
        tableSeq: 1,
        prName: 'REB',
        rowspan: 1,
        text: '待處理回覆2',
        value: 'eee',
        uuid: '6'
      }
    ]
  ],

  items: [
    {
      aaa: { type: 'button', text: 'aaa' },
      bbb: 'bbb',
      ccc: 'ccc',
      ddd: 'ddd',
      eee: 'eee'
    },
    {
      aaa: { type: 'link', text: '###' },
      bbb: 'bbb',
      ccc: 'ccc',
      ddd: 'ddd',
      eee: 'eee'
    },
    {
      aaa: { type: 'checkbox', text: 'aaa' },
      bbb: 'bbb',
      ccc: 'ccc',
      ddd: 'ddd',
      eee: 'eee'
    },
    {
      aaa: 'aaa',
      bbb: 'bbb',
      ccc: 'ccc',
      ddd: 'ddd',
      eee: { type: 'checkbox', text: '123' }
    }
  ]
}
