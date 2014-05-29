var HeaderNavigation = React.createClass({
  render: function() {
    return (
      React.DOM.div(
        {
          className: "pure-menu pure-menu-open pure-menu-horizontal"
        },
        [
          React.DOM.span(
            {
              className: "pure-menu-heading"
            },
            "lilly"
          ),
          React.DOM.ul(
            null,
            [
              AddButton(),
              ListButton(),
              RefreshButton()
            ]
          )
        ]
      )
    );
  }
});

var RefreshButton = React.createClass({
  getInitialState: function() {
    return {
      spinning: false
    };
  },

  componentDidMount: function() {
    Events.on("ui:loadingSpinner:stateChange", this.handleStateChange);
  },

  componentWillUnmount: function() {
    Events.off("ui:loadingSpinner:stateChange", this.handleStateChange);
  },

  handleStateChange: function(state) {
    this.setState({spinning: state});
  },

  handleClick: function(event) {
    event.preventDefault();
    Events.trigger("ui:refreshButton:click");
  },

  render: function() {
    var loaderClasses = "fa fa-refresh fa-fw" + (this.state.spinning ? " fa-spin" : "");
    return (
      React.DOM.li(
        null,
        React.DOM.a(
          {
            href: "#refresh",
            id: "refresh",
            onClick: this.handleClick
          },
          React.DOM.i(
            {
              id: "loader",
              className: loaderClasses
            }
          )
        )
      )
    );
  }
});

var AddButton = React.createClass({
  getInitialState: function() {
    return {
      selected: false
    };
  },

  componentDidMount: function() {
    Events.on("ui:view:changeView", this.handleViewChange);
  },

  componentWillUnmount: function() {
    Events.off("ui:view:changeView", this.handleViewChange);
  },

  handleViewChange: function(view) {
    this.setState({
      selected: (view == "add")
    });
  },

  handleClick: function(event) {
    event.preventDefault();
    Events.trigger("ui:view:changeView", "add");
  },

  render: function() {
    return (
      React.DOM.li(
        {
          className: (this.state.selected ? "pure-menu-selected" : "")
        },
        React.DOM.a(
          {
            href: "#add",
            onClick: this.handleClick
          },
          React.DOM.i(
            {
              className: "fa fa-plus fa-fw"
            }
          )
        )
      )
    );
  }
});

var ListButton = React.createClass({
  getInitialState: function() {
    return {
      selected: false
    };
  },

  componentDidMount: function() {
    Events.on("ui:view:changeView", this.handleViewChange);
  },

  componentWillUnmount: function() {
    Events.off("ui:view:changeView", this.handleViewChange);
  },

  handleViewChange: function(view) {
    this.setState({
      selected: (view == "list")
    });
  },

  handleClick: function(event) {
    event.preventDefault();
    Events.trigger("ui:view:changeView", "list");
  },

  render: function() {
    return (
      React.DOM.li(
        {
          className: (this.state.selected ? "pure-menu-selected" : "")
        },
        React.DOM.a(
          {
            href: "#list",
            onClick: this.handleClick
          },
          React.DOM.i(
            {
              className: "fa fa-folder-open fa-fw"
            }
          )
        )
      )
    );
  }
});

var AddManuallyForm = React.createClass({
  getInitialState: function() {
    return {
      visible: false,
      target: null
    };
  },

  componentDidMount: function() {
    Events.on("ui:addManuallyForm:targetChange", this.handleTargetChange);
  },

  componentWillUnmount: function() {
    Events.off("ui:addManuallyForm:targetChange", this.handleTargetChange);
  },

  handleTargetChange: function(target) {
    this.setState({
      visible: !!target,
      target: target
    });
  },

  handleFormSubmit: function(event) {
    event.preventDefault();
    app.storage.addUrl(
      this.state.target,
      this.refs.url.getDOMNode().value.trim()
    );
    this.refs.url.getDOMNode().value = null;
    this.replaceState(this.getInitialState());
  },

  handleAbortButton: function(event) {
    event.preventDefault();
    this.refs.url.getDOMNode().value = null;
    this.replaceState(this.getInitialState());
  },

  render: function() {
    var formClasses = "pure-form pure-form-stacked pure-g" +
      (this.state.visible ? "" : " hidden");

    return (
      React.DOM.form(
        {
          className: formClasses,
          onSubmit: this.handleFormSubmit
        },
        [
          React.DOM.div(
            {
              className: "pure-u-1"
            },
            React.DOM.input(
              {
                type: "text",
                ref: "url",
                placeholder: "url please...",
                className: "pure-input-1"
              }
            )
          ),
          React.DOM.div(
            {
              className: "pure-u-1-6"
            },
            React.DOM.button(
              {
                className: "pure-button icon-button pure-input-1",
                onClick: this.handleAbortButton
              },
              React.DOM.i(
                {
                  className: "fa fa-trash-o fa-fw"
                }
              )
            )
          ),
          React.DOM.div(
            {
              className: "pure-u-5-6"
            },
            React.DOM.input(
              {
                type: "submit",
                value: "add to '" + this.state.target + "'",
                className: "pure-button pure-button-primary pure-input-1"
              }
            )
          )
        ]
      )
    );
  }
});

var Dropzone = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    Events.trigger("ui:addManuallyForm:targetChange", this.props.name);
  },

  handleDragCancel: function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    return false;
  },

  handleDrop: function(category, event) {
    event.preventDefault();
    var url;
    if (event.dataTransfer.types.contains("text/x-moz-text-internal")) {
      url = event.dataTransfer.getData("text/x-moz-text-internal");
    } else {
      url = event.dataTransfer.getData("Text");
    }
    app.storage.addUrl(category, url);
  },

  render: function() {
    return (
      React.DOM.div(
        {
          className: "dropzone",
          id: this.props.name,
          onClick: this.handleClick,
          onDragEnter: this.handleDragCancel,
          onDragOver: this.handleDragCancel,
          onDrop: this.handleDrop.bind(this, this.props.name)
        },
        React.DOM.div(
          {
            className: "dropzone-inner"
          },
          React.DOM.i(
            {
              className: "fa " + this.props.icon + " fa-fw"
            }
          )
        )
      )
    );
  }
});

var Dropzones = React.createClass({
  getInitialState: function() {
    return {
      dropzones: window.app.config.categories
    };
  },

  render: function() {
    return (
      React.DOM.div(
        {
          className: "pure-g iconrow"
        },
        this.state.dropzones.map(function(dropzone) {
          return (
            React.DOM.div(
              {
                key: dropzone.name,
                className: "pure-u-1-2"
              },
              Dropzone(dropzone)
            )
          );
        })
      )
    );
  }
});

var CategoryButton = React.createClass({
  getInitialState: function() {
    return {
      selected: false
    };
  },

  componentDidMount: function() {
    Events.on("ui:view:changeCategory", this.handleCategoryChange);
  },

  componentWillUnmount: function() {
    Events.off("ui:view:changeCategory", this.handleCategoryChange);
  },

  handleCategoryChange: function(category) {
    this.setState({
      selected: (category == this.props.name)
    });
  },

  handleClick: function(event) {
    event.preventDefault();
    Events.trigger("ui:view:changeCategory", this.props.name);
  },

  render: function() {
    return (
      React.DOM.li(
        {
          className: (this.state.selected ? "pure-menu-selected" : "")
        },
        React.DOM.a(
          {
            href: "#list/" + this.props.name,
            onClick: this.handleClick
          },
          React.DOM.i(
            {
              className: "fa " + this.props.icon + " fa-fw"
            }
          )
        )
      )
    );
  }
});

var CategoryNavigation = React.createClass({
  getInitialState: function() {
    return {
      categories: window.app.config.categories
    };
  },

  render: function() {
    return (
       React.DOM.div(
        {
          className: "pure-menu pure-menu-open pure-menu-horizontal"
        },
        React.DOM.ul(
          null,
          this.state.categories.map(function(category) {
            return (
              CategoryButton(category)
            );
          })
        )
      )
    );
  }
});

var LinkListItem = React.createClass({
  render: function() {
    return (
      React.DOM.li(
        null,
        this.props.title + ": " + this.props.url
      )
    );
  }
});

var LinkList = React.createClass({
  getInitialState: function() {
    return {
      links: []
    };
  },

  componentDidMount: function() {
    Events.on("ui:view:changeCategory", this.handleCategoryChange);
  },

  componentWillUnmount: function() {
    Events.off("ui:view:changeCategory", this.handleCategoryChange);
  },

  handleCategoryChange: function(category) {
    if(!category) return;

    this.setState({
      links: app.storage.getByCategory(category)
    });
  },

  render: function() {
    return (
      React.DOM.ul(
        null,
        this.state.links.map(function(link) {
          return (
            LinkListItem(link)
          );
        })
      )
    );
  }
});

var Ui = (function() {
  function Ui() {}

  Ui.prototype.startLoadingSpinner = function() {
    Events.trigger("ui:loadingSpinner:stateChange", true);
  };

  Ui.prototype.stopLoadingSpinner = function() {
    Events.trigger("ui:loadingSpinner:stateChange", false);
  };

  Ui.prototype.flash = function(color) {
    document.body.classList.add("flash-"+color);
    window.setTimeout(function() {
      document.body.classList.remove("flash-"+color);
    }, 2100);
  };

  Ui.prototype.bindViewEvents = function() {
    Events.on("ui:view:changeView", this.handleViewChange.bind(this));
  };

  Ui.prototype.handleViewChange = function(view) {
    switch(view) {
      case "list":
        this.unmountAddingView();
        this.renderListView();
        break;
      default:
        this.unmountListView();
        this.renderAddingView();
        break;
    }
  };

  Ui.prototype.renderGeneralComponents = function() {
    React.renderComponent(
      HeaderNavigation(),
      document.getElementById("headernavigation")
    );
  };

  Ui.prototype.renderAddingView = function() {
    React.renderComponent(
      AddManuallyForm(),
      document.getElementById("addmanuallyarea")
    );

    React.renderComponent(
      Dropzones(),
      document.getElementById("droparea")
    );
  };

  Ui.prototype.unmountAddingView = function() {
    React.unmountComponentAtNode(document.getElementById("addmanuallyarea"));
    React.unmountComponentAtNode(document.getElementById("droparea"));
  };

  Ui.prototype.renderListView = function() {
    React.renderComponent(
      CategoryNavigation(),
      document.getElementById("categorynavigation")
    );

    React.renderComponent(
      LinkList(),
      document.getElementById("listarea")
    );
  };

  Ui.prototype.unmountListView = function() {
    React.unmountComponentAtNode(document.getElementById("categorynavigation"));
    React.unmountComponentAtNode(document.getElementById("listarea"));
  };

  return Ui;
})();
