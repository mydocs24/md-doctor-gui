<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'

  Vue.use(VueResource)

  /* IN OUR TESTS */
  let routes = [
    {
      method: 'GET',
      url: 'doctor/accidents',
      response: {
        total: 5,
        'per_page': 15,
        'current_page': 1,
        'last_page': 1,
        'next_page_url': '#next_page',
        'prev_page_url': null,
        'from': 1,
        'to': 5,
        data: [{
          id: 17,
          date: '2017-03-12',
          refNum: 'ref-01-0001',
          city: 'Madrid',
          status: 'new',
          phone: '+375255283638',
          address: 'Gikalo st., 22/44',
          symptoms: 'Head ache, sore throat, the hand with some dotes.'
        },
        {
          id: 1,
          date: '2017-03-12',
          refNum: 'ref-02-0001',
          city: 'Barcelona',
          status: 'new'
        },
        {
          id: 5,
          date: '2017-03-26',
          refNum: 'ref-03-0001',
          city: 'Alicante',
          status: 'signed',
          phone: '+380953055704',
          address: 'Somewhere in Alicante, Middle streer 8',
          symptoms: 'I want to see a doctor'
        },
        {
          id: 3,
          date: '2017-03-26',
          refNum: 'ref-04-0005',
          city: 'Madrid',
          status: 'sended',
          phone: '+10003756937',
          address: 'Mega street, 1/2',
          symptoms: 'Any symptoms should be here'
        },
        {
          id: 4,
          date: '2017-03-26',
          refNum: 'ref-05-0005',
          city: 'Madrid',
          status: 'closed',
          phone: '+10003756937',
          address: 'Mega street, 1/2',
          symptoms: 'Any symptoms should be here'
        },
        {
          id: 10,
          date: '2017-03-26',
          refNum: 'ref-07-0005',
          city: 'Barcelona',
          status: 'processing',
          phone: '+10003756937',
          address: 'A-Mega street, 1/2',
          symptoms: 'Any symptoms should be here'
        },
        {
          id: 7,
          date: '2017-03-26',
          refNum: 'ref-01-0129',
          city: 'Barcelona',
          status: 'processing',
          phone: '+10003756937',
          address: 'A-Mega street, 1/2',
          symptoms: 'Any symptoms should be here'
        }]
      }
    },
    {
      method: 'PUT',
      url: 'doctor/accidents/17',
      response: {
        id: 17,
        date: '2017-03-12',
        refNum: 'ref-01-0001',
        city: 'Madrid',
        status: 'new'
      }
    },
    {
      method: 'GET',
      url: 'doctor/accidents/17',
      response: {
        id: 17,
        userName: 'Foster Abigail',
        city: 'Barcelona',
        address: 'Benidorm, Adolfa Uzuarez 162/4, 52',
        status: 'new',
        accident: {
          parent_id: 0,
          phones: '375255283638',
          date: '2017-03-12',
          refNum: 'ref-02-0001',
          address: 'Benidorm, Adolfa Uzuarez 162/4, 52',
          reason: 'Reason of the call. Call from the Assistant company AXA. Patient with some ill want to get medical appointment',
          user: {
            id: 1,
            name: 'Foster Abigail',
            phones: '375255283638',
            address: 'Benidorm, Adolfa Uzuarez 162/4, 52'
          },
          passports: {},
          insurances: {}
        }
      }
    },
    {
      method: 'GET',
      url: 'doctor/me',
      response: {
        name: 'Doctor Aibolit',
        picture_url: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-9/13007374_971838689558988_8853583067139950859_n.jpg?oh=1ac22b8094c9a93c13c4692c3fa809d0&oe=59300A59',
        city: 'Tenerife',
        phones: '+375255283638'
      }
    },
    {
      method: 'GET',
      url: 'doctor/services',
      response: {
        total: 5,
        'per_page': 5,
        'current_page': 1,
        'last_page': 1,
        'next_page_url': null,
        'prev_page_url': null,
        'from': 5,
        'to': 5,
        data: [{
          id: 1,
          type: 'accident',
          title: 'Hint',
          price: 10.99,
          description: 'Description for this hint'
        }, {
          id: 2,
          type: 'accident',
          title: 'Extra service',
          price: 10.99,
          description: 'Patient wants something extra obligtions'
        }, {
          id: 3,
          type: 'accident',
          title: 'Pills',
          price: 10.99,
          description: 'Give patient very expensive pills or other drugs'
        }, {
          id: 4,
          type: 'accident',
          title: 'Medical appointment',
          price: 10.99,
          description: 'I had medical appointment, so it should be payed'
        }, {
          id: 5,
          type: 'accident',
          title: 'Pick up',
          price: 10.99,
          description: 'If patient was picked up to the hospital'
        }, {
          id: 1,
          type: 'doctor',
          title: 'Created by me',
          price: 10.99,
          description: 'Patient wants something extra obligations'
        }]
      }
    },
    {
      method: 'POST',
      url: 'doctor/services',
      response: {
        status: 'success',
        service: {
          id: 2,
          type: 'doctor',
          title: 'Created just now',
          price: 1000,
          description: 'Patient wants something extra services'
        }
      }
    },
    {
      method: 'GET',
      url: 'doctor/accidents/17/services',
      response: {
        services: [
          {
            id: 5,
            type: 'accident',
            title: 'Pick up',
            price: 10.99,
            description: 'If patient was picked up to the hospital'
          }, {
            id: 1,
            type: 'doctor',
            title: 'Created by me',
            price: 10.99,
            description: 'Patient wants something extra obligations'
          }
        ]
      }
    },
    {
      method: 'GET',
      url: 'doctor/surveys',
      response: {
        total: 5,
        'per_page': 5,
        'current_page': 1,
        'last_page': 1,
        'next_page_url': null,
        'prev_page_url': null,
        'from': 5,
        'to': 5,
        data: [{
          id: 1,
          type: 'accident',
          title: 'Eye slashes',
          description: 'Description for this survey with eye slashes'
        }, {
          id: 2,
          type: 'accident',
          title: 'Extra survey',
          description: 'Another survey'
        }, {
          id: 1,
          type: 'doctor',
          title: 'Survey created by me',
          description: 'Doctor creates new survey'
        }]
      }
    },
    {
      method: 'POST',
      url: 'doctor/surveys',
      response: {
        status: 'success',
        survey: {
          id: 2,
          type: 'doctor',
          title: 'Created just now',
          description: 'Survey just created by that doctor'
        }
      }
    },
    {
      method: 'GET',
      url: 'doctor/accidents/17/surveys',
      response: {
        surveys: [
          {
            id: 1,
            type: 'accident',
            title: 'Eye slashes',
            description: 'Description for this survey with eye slashes'
          }
        ]
      }
    },
    {
      method: 'GET',
      url: 'doctor/caseTypes',
      response: {
        data: [
          {
            id: 1,
            title: 'Insurance'
          }, {
            id: 2,
            title: 'Non-Insurance'
          }
        ]
      }
    },
    {
      method: 'GET',
      url: 'doctor/accidents/17/caseType',
      response: {
        id: 1,
        title: 'Insurance'
      }
    },
    {
      method: 'GET',
      url: 'doctor/accidents/17/patient',
      response: {
        id: 1,
        name: 'Foster Abigail',
        city: 'Barcelona',
        phones: [{tel: '+375255283638'}],
        address: 'Benidorm, Adolfa Uzuarez 162/4, 52',
        reason: 'Reason of the call. Call from the Assistant company AXA. Patient with some ill want to get medical appointment'
      }
    },
    {
      method: 'GET',
      url: 'doctor/accidents/17/status',
      response: {status: 'new'}
    }
  ]

  Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
  Vue.http.interceptors.unshift((request, next) => {
    let route = routes.find((item) => {
      return request.method === item.method && request.url === item.url
    })
    if (!route) {
      // we're just going to return a 404 here, since we don't want our test suite making a real HTTP request
      next(request.respondWith({
        result: false,
        data: 'Page not exists'
      }, {
        status: 404,
        statusText: 'Oh no! Not found!'
      }))
    } else {
      next(
        request.respondWith(
          route.response,
          {
            status: 200,
            statusText: 'OK'
          }
        )
      )
    }
  })
</script>
