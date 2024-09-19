import React, { Component } from 'react';

class YandexShare extends Component {
  componentDidMount() {
    window.Ya.share2('ya', {
      theme: { services: 'vkontakte,odnoklassniki,telegram', shape: 'round' },
      content: { url: 'https://itis-projects.ivgpu.ru/', description: 'sdfdsa', title: 'ites' },
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="ya" />;
  }
}

export default YandexShare;
