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
    return React.DOM.a(
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
    );
  }
});

var Dropzone = React.createClass({
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
    if(validUrl(url)) {
      app.storage.addUrl(category, url);
    } else {
      app.ui.flash("red");
    }
  },

  render: function() {
    return React.DOM.div(
      {
        className: "dropzone",
        id: this.props.category,
        onDragEnter: this.handleDragCancel,
        onDragOver: this.handleDragCancel,
        onDrop: this.handleDrop.bind(this, this.props.category)
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
    );
  }
});

var Dropzones = React.createClass({
  getInitialState: function() {
    return {
      dropzones: [
        {
          category: "tech",
          icon: "fa-code"
        },
        {
          category: "article",
          icon: "fa-file-text"
        },
        {
          category: "entertain",
          icon: "fa-film"
        },
        {
          category: "other",
          icon: "fa-bookmark"
        }
      ]
    };
  },

  render: function() {
    return (
      React.DOM.div({
          className: "pure-g iconrow"
        },
        this.state.dropzones.map(function(dropzone) {
          return (
            React.DOM.div({
                key: dropzone.category,
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

  Ui.prototype.renderAddingView = function() {
    React.renderComponent(
      RefreshButton(null),
      document.getElementById("refresh-container")
    );

    React.renderComponent(
      Dropzones(null),
      document.getElementById("droparea")
    );
  }

  return Ui;
})();
