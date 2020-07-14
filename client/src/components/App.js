import React from 'react';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { file } = this.state;
    this.uploadFile(file);
  }

  async uploadFile(file) {
    try {
      const uploadResponse = await fetch(`/upload?type=${file.type}`);
      const uploadConfig = await uploadResponse.json();

      const s3Response = await fetch(uploadConfig.url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleFileChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  render() {
    return (
      <div>
        <h1>Amazon S3 Upload</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>Upload an Image</h3>
          <input
            onChange={this.handleFileChange}
            type="file"
            accept="image/*"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
