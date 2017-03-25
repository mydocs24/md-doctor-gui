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
        total: 2,
        'per_page': 1,
        'current_page': 1,
        'last_page': 1,
        'next_page_url': '#next_page',
        'prev_page_url': null,
        'from': 1,
        'to': 15,
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
        picture_url: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-9/13007374_971838689558988_8853583067139950859_n.jpg?oh=1ac22b8094c9a93c13c4692c3fa809d0&oe=59300A59'
      }
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
