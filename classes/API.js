class API {
  constructor(apiURL, errorHandler) {
    this.errorHandler = errorHandler;
    this.apiURL = apiURL;
    this.ready = true;
  }

  // eslint-disable-next-line class-methods-use-this
  parseOptions(options) {
    const newOptions = { ...options };
    if (newOptions.body) {
      newOptions.headers = {
        ...newOptions.headers,
        "Content-Type": "application/json",
      };
      newOptions.body = JSON.stringify(options.body);
    }
    return newOptions;
  }

  async get(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      let response;
      const url = this.apiURL + endpoint;

      if (options) {
        optionsToSend = this.parseOptions(options);

        response = await fetch(url, optionsToSend);
      } else {
        response = await fetch(url);
      }

      const body = await response.json();

      callBack({ response, body });
    } catch (error) {
      const APIError = {
        endpoint,
        method: "GET",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async getResponse(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      let response;
      const url = this.apiURL + endpoint;

      if (options) {
        optionsToSend = this.parseOptions(options);

        response = await fetch(url, optionsToSend);
      } else {
        response = await fetch(url);
      }

      callBack(response);
    } catch (error) {
      const APIError = {
        endpoint,
        method: "GET",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async getBody(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      let response;
      const url = this.apiURL + endpoint;

      if (options) {
        optionsToSend = this.parseOptions(options);

        response = await fetch(url, optionsToSend);
      } else {
        response = await fetch(url);
      }
      const body = await response.json();

      callBack({ body, ok: response.ok });
    } catch (error) {
      const APIError = {
        endpoint,
        method: "GET",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async post(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "POST",
        ...optionsToSend,
      });
      const body = await response.json();

      callBack({ response, body });
    } catch (error) {
      const APIError = {
        endpoint,
        method: "POST",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async postResponse(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "POST",
        ...optionsToSend,
      });

      callBack(response);
    } catch (error) {
      const APIError = {
        endpoint,
        method: "POST",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async postBody(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "POST",
        ...optionsToSend,
      });
      const body = await response.json();

      callBack({ body, ok: response.ok });
    } catch (error) {
      const APIError = {
        endpoint,
        method: "PUT",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async put(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "PUT",
        ...optionsToSend,
      });
      const body = await response.json();

      callBack({ response, body });
    } catch (error) {
      const APIError = {
        endpoint,
        method: "PUT",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async putResponse(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "POST",
        ...optionsToSend,
      });

      callBack(response);
    } catch (error) {
      const APIError = {
        endpoint,
        method: "PUT",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async delete(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "DELETE",
        ...optionsToSend,
      });
      const body = await response.json();

      callBack({ response, body });
    } catch (error) {
      const APIError = {
        endpoint,
        method: "DELETE",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async deleteResponse(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "DELETE",
        ...optionsToSend,
      });

      callBack(response);
    } catch (error) {
      const APIError = {
        endpoint,
        method: "DELETE",
        error,
      };
      this.errorHandler(APIError);
    }
  }

  async deleteBody(endpoint, callBack, options) {
    try {
      let optionsToSend = {};
      if (options) {
        optionsToSend = this.parseOptions(options);
      }

      const response = await fetch(this.apiURL + endpoint, {
        method: "DELETE",
        ...optionsToSend,
      });
      const body = await response.json();

      callBack({ body, ok: response.ok });
    } catch (error) {
      const APIError = {
        endpoint,
        method: "DELETE",
        error,
      };
      this.errorHandler(APIError);
    }
  }
}

export default API;
