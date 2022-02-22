# 들어가기 전에
 현재까지 작성된 코드는 최소한의 설정 입니다.lint 나 test 등의 코드는 현재 없습니다. 또한, 상태관리 등의 코드도 존재 하지 않는 boilerplate에 가까운 코드 입니다.
향후 좀 더 발전된 버전을 현 repo 또는 다른 repo에서 제공 하도록 하겠습니다.  
  
최초에는 react, next, apollo를 사용하는 다른 버전에서 발전 시킨 내용 입니다. 해당 버전에서 시간이 흐름에 따라 몇몇 package를 업그레이드 한 결과입니다.
next 내에서 서버 쪽에 apollo 요청을 위해 부득이 하게 자신의 서버에서 자신의 서버를 요청하는 케이스가 존재합니다. 현재는 더 적합한 다른 방법이 있는지에 대해서는
스터디가 되어 있지 않습니다. 설정내에 서버 명과 api endpoint 등을 설정하는 이유도 그러한 이유 입니다. 향후 더 좋은 방향이 있다면 수정하도록 하겠습니다.

# 폴더 구조 
```
.
├── doc // 문서
├── public // 정적 파일
└── src // source 파일
    ├── apollo // 아폴로
    │   ├── client // 클라이언트 관련 코드
    │   ├── document // document
    │   └── server // 서버
    │       ├── context // context
    │       ├── dataSources // 데이터 소스(api 연결)
    │       ├── plugins // 플러그인 
    │       ├── resolvers // resolver
    │       ├── types // types
    │       └── utils // 기타 유틸
    ├── components // 컴퍼넌트(react)
    ├── config // 설정
    └── pages // pages(next)
        └── api // graphql 연결을 위한 api 폴더

```
기본적으로 [api-routes-apollo-server-and-client](https://github.com/vercel/next.js/tree/canary/examples/api-routes-apollo-server-and-client) 와
[with-typescript-graphql](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-graphql) 를 참조하였습니다.  
[여기](https://nextjs.org/examples) 에 더 많은 예제를 찾아볼 수 있습니다.
utils 폴더와 같은 폴더는 공통의 구조로 어디에서든 나타날 수 있다고 가정하였습니다. 가능하면 더 관계가 깊은 폴더끼리 그룹핑 하였습니다.  
그러나, 중앙에서 관리되어야 더 강점인 폴더인 경우 한군데 존재하는 것이 유리하다고 생각합니다.  
현재는 상태관리에 대한 폴더는 없지만, 이런 류의 폴더는 한군데 있는 것이 더 유리 합니다.

# how to work
## 먼저, 타입 generate 에 관해...
패키지의 gen 은 코드를 자동 generate 합니다. 이 과정에서 type 역시 자동 생성 됩니다.  
그러므로, 생성된 주요 타입으로 확장하여 프로그램 내에 모든 파트에서 더 가독성 있는 코드가 생성이 가능합니다.  
데이터의 플로우와 도메인의 이해는 프론트엔드에서도 마찬가지로 주요합니다. 타입의 일관성을 최대한 유지해 주세요.  
또한, 적절한 comment 역시 가독성을 높이는 주요 요소 입니다. apollo 에서도 types 에서도 이러한 comment 가 존재합니다.  
다음은 graphql 코멘트 입니다. """코멘트 내용""" 형태로 작성합니다. 이렇게 작성된 코멘트는 generate 과정에서도 코멘트로 생성 됩니다.  
필드나 타입에 대한 설명 또는 프로그램 이해를 필요한 설명이나 이슈 링크 등 필요한 정보를 제공해 주세요.

```graphql
"""Author of a complete Track or a Module"""
type Author {
  id: ID!
  """Author's first and last name"""
  name: String!
  """Author's profile picture"""
  photo: String
}
```

## types 작성하기
저는 types 부터 코드를 작성합니다. 방법이 정해져 있는 것은 아니나, 제가 일반적으로 코드를 작성하는 플로우에 따라 설명합니다.  
타 서버의 api의 호출을 가정으로 설명합니다.  
types 는 기본적인 데이터 모델입니다. 필드를 재정의 할수도 있겠지만, API 필드를 그대로 사용하면 좀 더 편합니다.  
아래와 같이 graphql type 을 정의하여 주세요.  
가능하면 필수 체크를 엄격하게 작성 하여주세요.(! 표시)
또한 enum 이나 적절한 타입을 사용하여 더 가독성 높은 모델을 사용하여 주세요.  

```graphql
"""Author of a complete Track or a Module"""
type Author {
  id: ID!
  """Author's first and last name"""
  name: String!
  """age"""
  age: Int
}

"""사용 타입"""
enum Status {
  """생성"""
  CREATED
  """archived"""
  ARCHIVED
}
```

tip) json 결과를 graphql 로 변환 할 수 있는 많은 사이트가 존재 합니다. 변환 후 더 적절하게 수정하면 편리합니다.  
https://transform.tools/json-to-graphql

## dataSource 작성하기
이제 datasource 를 작성할 차례입니다. 실제로 API를 호출 하는 구간입니다.
API 호출 및 여러가지 방법으로 Data를 가지고 오는 방법이 존재 합니다.
아래는 예제 입니다.

```typescript
//dataSource
export default class TrackAPI extends RESTDataSource {
  constructor(readonly baseURL = 'http://xxxxx.com') {
    super()
  }

  protected willSendRequest?(request: RequestOptions): ValueOrPromise<void> {
    request.headers.set('Accept', 'application/json')
    request.headers.set('X-Trace-Id', this.context.headers?.['x-transaction-id'])
  }

  getTracksForHome() {
    return this.get('/tracks')
  }

  getAuthor(authorId) {
    return this.get(`/author/${authorId}`)
  }
}

//connect
const dataSources = () => ({
  trackAPI: new TrackAPI()
})

```

## resolver 작성하기
resolver에서 Api를 호출할 수 있다. 여러가지 Query, Mutation 등을 정의한다. 

```typescript
const trackResolver = {
  Query: {
    search: (_, { id, name }, { dataSources },) => dataSources.trackAPI.search({ id, name }),
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => dataSources.trackAPI.getAuthor(authorId),
  }
}
```

## document 작성하기
이제 document를 작성한다. 실제로 document는 코드 내에서는 하는 일이 없다. 실제로 사용하게 될 쿼리 등을 미리 작성하면 된다.  
그에 따라 프로그램 내에서 필요한 코드가 자동으로 생성된다. (타입, 훅 등)   
document에서 하는 것은 쿼리의 작성이다. 그러므로 쿼리는 페이지 레벨로 작성되면 된다.
그에 반해 type, datasource, resolver는 API 레벨로 작성한다.  
필요한 모든 코드를 생성하였는가? 개발 환경(로컬)이라면, 기동된 서버에서 테스트 해볼 수 있다.  
http://localhost:3000/api/graphql 로 접속 후 query your server를 클릭 후 작성한 쿼리를 테스트 하거나,
schema 정보를 얻을 수 있다.
```
query cancelPreview($reservationNoList: [String]!, $adminCancelType: AdminCancelType!) {
  cancelPreview(reservationNoList: $reservationNoList, adminCancelType: $adminCancelType) {
    reservationNo
    propertyName
    summaries {
      commissionAmount
      refundAmount
    }
  }
}
```

## test code 작성하기
TBD

## ui 작성하기
페이지 레벨로 전체 프로그램을 작성하고, 이후 리팩토링을 통해 분리하는 방법과 작은 컴퍼넌트 레벨에서 컴퍼넌트 중심 개발 방법 중 적절히 선택 하여 ui를 개발한다.

# 어떻게 돌아가는가?
[next](https://nextjs.org/docs/getting-started), [react](https://ko.reactjs.org/), [apollo](https://www.apollographql.com/docs/) 등으로 구성된 현 프로젝트에 대해서 한번에 설명하긴 어렵다. 각각의 문서를 참조하길 바란다.
여기서는 간단히 몇몇가지만 소개하는 정도로 넘어갈 것이다.

## generate
[graphql-let](https://github.com/piglovesyou/graphql-let)을 이용해 필요한 타입과 리엑트 훅을 자동 생성한다.  
@generated/xxx 경로를 통해 해당 코드들을 참조할 수 있다. 실제로는 __generated__ 폴더에 생성된다.  
gen script(npm run gen)에서 직접 코드를 생성 가능하며, dev script(npm run dev)에도 서버 기동전에 코드가 자동 생성된다.
생성된 코드는 코밋 대상은 아니다.

cf) https://www.graphql-code-generator.com/
## next apollo connect
코드는 아래와 같다. pages/api/graphql.ts 이며, 그러므로 웹서버 내에 pages/api/graphql경로에서 Api entry point가 제공된다.  
정의된 서버를 기동하며 nextjs에 핸들러를 제공하는 방식으로 구현되었다.  

```typescript
import server from '~/apollo/server'

const startServer = server.start()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'access-control-allow-methods',
    'POST'
  )
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api:  {
    bodyParser:  false
  }
}
```
## apollo link
apollo link는 apollo client 내에 요청 과정을 조정하는 주요한 과정이다.
<img src="https://miro.medium.com/max/1400/1*jAuawvkCYywd85nn1CRmSA.png" />
각 링크는 요청 과정 내에 필요한 하나의 역활을 담당한다.  
retry, logging, timeout 등 여러가지 것들을 설정할 수 있으며, Persisted Queries 등 여러가지 링크가 제공되며, community link 역시 제공된다.  
또한, 직접 만드는 것도 가능하다.


# 문제점
## micro
next.js 11 버전 설치하면서 아래와 같은 문제가 발생해 micro로 dependency를 추가해 두었다. 문제가 없다면, 이후 삭제 하겠다.  
https://stackoverflow.com/questions/68624233/micro-module-not-found-after-updating-to-nextjs-11

## version
나는 가장 최신의 버전을 설치하는 것을 선호한다. 하지만, 현재 apollo, nextjs 각각 최신의 버전으로 설정하게 되면 문제가 있어,  
현재의 버전은 apollo-server-micro: 3.6.3, next: 11.1.2로 약간 낮춰 두었다. 문제가 없는 것이 발견되면 업데이트 하겠다.

# 좀 더 나아가서...
서버 쪽 로직을 nest.js로 구성하는 것도 흥미롭다. 향후 이 버전의 조합도 연구해볼만 하다. 그러나, 반면 조합에 여러문제가 발견된다는 이야기도 들었다.(직접 확인해보지 않았지만,)  
사실 어떻게 보면 nest.js 조합은 angular 쪽의 스택과 잘맞는 것으로 생각되어 진다.  
  
apollo 는 사실 micro service 기반에서 페더레이션이 지원되는 환경에서 가장 이상적이라고 생각된다. 또한 커뮤니티의 발전 방향도 페더레이션이 발전되는 것으로 느껴진다.  
이 boilerplate는 페더레이션이 빠진 상태로 개발되어 있고, 독립의 단일 서버 또한 렌더링까지 포함하는 버전이다.  
  
상황에 따라 더 좋은 방법이 있을 수 있다.
이 문서는 이 boilerplate를 이용할 시 개발하는 방법에 대해서 최소한의 간략한 내용만 다루었다.  
아마도 apollo로나 nextjs 등에 전혀 익숙하지 않은 사람들을 위한 간단한 소개 정도의 느낌으로 다루었다.  
더 자세한 것을 문서를 통해 확인하길 바란다.

<img src="https://github.com/otwm/react-apollo-nextjs-boilerplate/blob/master/doc/single.png?raw=true" />  

single

<img src="https://github.com/otwm/react-apollo-nextjs-boilerplate/blob/master/doc/federation.png?raw=true" />  

federation
