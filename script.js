// script.js

// Sidebar

function toggleSidebar(){

  const sidebar =
    document.getElementById('sidebar')

  sidebar.classList.toggle('active')
}

// Chart

const ctx =
  document.getElementById('salesChart')

if(ctx){

  new Chart(ctx,{

    type:'bar',

    data:{

      labels:[
        '月',
        '火',
        '水',
        '木',
        '金'
      ],

      datasets:[{

        label:'契約数',

        data:[
          3,
          5,
          8,
          4,
          7
        ],

        backgroundColor:[
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#bfdbfe'
        ]

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  })

}