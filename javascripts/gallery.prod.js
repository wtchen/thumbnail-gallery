var MyFileHandler = React.createClass({displayName: "MyFileHandler",
    propTypes: {
        distributeImages: React.PropTypes.func.isRequired
    },
    sendImagesBack: function(e) {
        this.props.distributeImages(e);
    },
    render: function() {
        return React.createElement("input", {type: "file", id: "files", onChange: this.sendImagesBack, name: "files", multiple: true});
    }
});

var Scrollbox = React.createClass({displayName: "Scrollbox",
    render: function() {
        var listItems = function(file, index) {
            var reader = new FileReader();
            reader.onload = function() {
                document.getElementById("outImage"+index).src = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
            return (
                React.createElement("li", {className: "list-group-item", key: index + file.name}, 
                    React.createElement("img", {id: "outImage"+index, width: 330, draggable: "false", src: "#"})
                )
            );
        };
        return React.createElement("ul", {className: "list-group"}, this.props.fileList.map(listItems))
    }
});

var GalleryContainer = React.createClass({displayName: "GalleryContainer",
    getInitialState: function() {
        return {filelist: []};
    },
    distributeImages: function(e) {
        console.log(this.state.filelist);
        var fileArray = [];
        for (var i = 0; i < e.target.files.length; i++) {
            fileArray.push(e.target.files[i]);
        }
        this.setState({filelist: this.state.filelist.concat(fileArray)});
    },
    render: function() {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement(MyFileHandler, {distributeImages: this.distributeImages}), 
                React.createElement(Scrollbox, {fileList: this.state.filelist})
            )
        );
    }
});

React.render(React.createElement(GalleryContainer, null), document.getElementById("myGallery"));
