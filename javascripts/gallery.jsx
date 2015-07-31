var MyFileHandler = React.createClass({
    propTypes: {
        distributeImages: React.PropTypes.func.isRequired
    },
    sendImagesBack: function(e) {
        this.props.distributeImages(e);
    },
    render: function() {
        return <input type="file" id="files" onChange={this.sendImagesBack} name="files" multiple />;
    }
});

var Scrollbox = React.createClass({
    render: function() {
        var listItems = function(file, index) {
            var reader = new FileReader();
            reader.onload = function() {
                document.getElementById("outImage"+index).src = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
            return <li className="list-group-item" key={index + file.name}><img id={"outImage"+index} width={300} src="#"/></li>;
        };
        return <ul className="list-group">{this.props.fileList.map(listItems)}</ul>
    }
});

var GalleryContainer = React.createClass({
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
            <div className="container">
                <MyFileHandler distributeImages={this.distributeImages}/>
                <Scrollbox fileList={this.state.filelist}/>
            </div>
        );
    }
});

React.render(<GalleryContainer/>, document.getElementById("myGallery"));