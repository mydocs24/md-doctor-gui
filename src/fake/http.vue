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
      url: 'doctor/accidents/1',
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
      url: 'doctor/accident/1/',
      response: {
        id: 1,
        date: '2017-03-12',
        refNum: 'ref-02-0001',
        city: 'Barcelona',
        status: 'new'
      }
    }
  ]

  Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
  Vue.http.interceptors.unshift((request, next) => {
    let route = routes.find((item) => {
      return (request.method === item.method && request.url === item.url)
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
