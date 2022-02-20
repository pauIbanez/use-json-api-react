# Use json api react

A simple package that makes json api calls easy!

## Usage

The `useAPI` React hook gives you an object with the method `createAPI`. To start using the package simple import the react hook into your api context provider\*.

With the `createAPI` method you can, well, create an API instance. To do so, you need to pass in a base url, an error handler function and optionally an object with the defined endpoins as strings. It is important that createAPI is only called once, since you can have multiple APIs and so this method is not protected agait's multiple calls on render. It is recommended to use it inside a useEffect react hook.

The `createAPI` returns an api instance that contains all the supported method functions.

All the supported method functions follow the same structure, they accept the following parameters:

- An endpoint as a sting, though it is recommended to use the passed endpoints, see [using endpoints object](#using-endpoints)
- A callback which will be called once the operation has compleated with the result depending on the method used, more info in the [ API instance methods](#-api-instance-methods) section
- `OPTIONAL` Options object which will translate to the fetch options object. Note that if a body is present it will automatically conver it to JSON it and introduce the required headers.

Example of the put method being used:

```javascript
createdApi.put(
  createdApi.endpoints.create,
  (result) => {
    //handle result here
  },
  {
    body: {
      exampleContent:
        "This is the content that will go insside the body of the request",
      someOthercontent: [item1, item2],
    },
  }
);
```

### Example of usage

Full example of creating and using an API instance:

```javascript
import useAPI from "use-json-api-react";
import { useEffect } from "react";

const endpoints = {
  list: "somestuf"
  create: "somestuff/new"
  edit: "somestuf/edit/"
}

const apiURL = "https://someaapi.com/"

const ApiContextProvider = ({ children }) => {
  const apiManager = useAPI();
  useEffect(() => {
    const someApi = apiManager.createAPI(apiURL, errorHandlerFunction, endpoints);

    someApi.get(someApi.endpoints.list, listResultHandler);

    someApi.post(
      someApi.endpoints.create, createResultHandler,
      {
        body: {
          howIsThis: "easy",
        },
      }
    );
  }, [apiManager]);
};
```

\*It is not necesary to use `useAPI` in a context provider, but it is recommended.

## API instance methods

All of the methods have 3 variations, plain method, methodBody and methodResponse. The operations are similar but the result varies.

Note that any httpMethodBody (ex: postBody), dos not refer to the request body, but to the Response body, see bellow to find the difference between plain method and httpoMethodBody methods

- plain httpMethod (ex: apiInstance.post(...)): The result is an object that has a response and a body property. This properties directly translate to the response and body recieved from the fetch request.

```javascript
{
  response, body;
}
```

- httpMethodBody (ex: apiInstance.postBody(...)): The result is an object that has an ok and a body property. These properties correspond to the response.ok property from fetch and the body itself.

```javascript
{
  body, ok;
}
```

- httpMethodResponse (ex: apiInstance.postResponse): This method does not decode the body so it might be a better option if you don't care about it. The result is the response from the fetch request untouched.

### Avaliable methods

The available methods are:

- `GET`
- `POST`
- `PUT`
- `DELETE`

More coming soon.

## Error handling

It is recommended that you construct a function to handle the errors that may occur while using this packet. The errorHandler function will recieve an error object, This object IS NOT the error itself, it will have the following structure:

```javascript
{
  endpoint: "The endpoint that caused the error",
  method: "The method that caused the error",
  error: {
    //This is the error object itself
  },
}

```

## Testing

Testig is easy if you use this library. Because it works with callbacks you can simply test your callback passing a mock result. As long as the result follows the [same structure](#api-instance-methods) as the one passed by the library you will have your method tested.

To test that the library will be called you can mock the APIInstance object. Here's an example of how to do that, with also the variation of checking exactly what it has been called with:

```javascript
import apiInstance from "./theFileWhereItIsCreated";
import somefunctionThatIsSupposedToCallThisLibrary from "./somefile";

jest.mock("./theFileWhereItIsCreated");

describe("Given somefunctionThatIsSupposedToCallThisLibrary", ()=>{
  afterEach(()=>{
    jest.resetAllMocks(); //Important to reset the mock after being used to test individually
  })
  describe("When it's executed", ()=> {
    test("Then it should call the post method of the api instance", () => {
      const expectedEndpoint = "some endpoint";
      const expectedOptions = "expected options";

      const apiInstance.post = jest.fn();

      somefunctionThatIsSupposedToCallThisLibrary();

      expect(apiInstance.post).toHaveBeenCalled();
      expect(apiInstance.post).toHaveBeenCalledWith(expectedEndpoint, expect.any(Function), expectedOptions);
    })
  })
})

```

Here is an example on how to test the resultHandler:

```javascript
import resultHandler from "./apiResultHandlers";

describe("Given resultHandler", () => {
  describe("When it's executed", () => {
    test("Then it should doStuff", () => {
      const mockResult = {
        response: "This is supposed to be the response",
        body: {
          someProperty: "This is uposed to be a property of the body",
        },
      };

      resultHandler(mockResult);

      // here you make your own expect with what you need to check/happen
    });
  });
});
```

## Usage with react flux or redux

This library is fully compatible with the flux model, both with react native hooks or redux. Here you can see an example of a result handler that needs to dispatch an action. (The api setup is exactly the same).

This example assumes that you already have acces to the dispatch function.

```javascript
createdApi.getBody(
  createdApi.endpoints.delete,
  getListingResultHandler(dispatch)
);
```

Yes, that simple, now onto the `getListingResultHandler` function:

```javascript
const getListingResultHandler = (dispatch) => (result) => {
  if (result.ok) {
    const action = actionCreator(result.body.thisIWantToList);

    dispatch(action);
  }
};
```

And here you have a fully testable resultHandler working with flux.

Note you can use this structure to pass more info to the handler, not only the dispatch.
