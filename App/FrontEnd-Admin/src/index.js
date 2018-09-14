import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

// import './assets/stylesheets/styles.scss';

render(
  <Root />,
  document.getElementById('root')
);

//TODO: Faire un élément Root logé dans le Provider pour qu'il acceuil le LocaleProvider (dont l'attribut locale serait basé sur un des états du store) ainsi que loger le Router dans App

import { LocaleProvider, Pagination, DatePicker, TimePicker, Calendar,
  Popconfirm, Table, Modal, Button, Select, Transfer, Radio } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import frFR from 'antd/lib/locale-provider/fr_FR';
import deDE from 'antd/lib/locale-provider/de_DE';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'filter1',
    value: 'filter1',
  }],
}, {
  title: 'Age',
  dataIndex: 'age',
}];

class Page extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: false,
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  render() {
    const info = () => {
      Modal.info({
        title: 'some info',
        content: 'some info',
      });
    };
    const confirm = () => {
      Modal.confirm({
        title: 'some info',
        content: 'some info',
      });
    };
    return (
      <div className="locale-components">
        <div className="example">
          <Pagination defaultCurrent={1} total={50} showSizeChanger />
        </div>
        <div className="example">
          <Select showSearch style={{ width: 200 }}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
          </Select>
          <DatePicker />
          <TimePicker />
          <RangePicker style={{ width: 200 }} />
        </div>
        <div className="example">
          <Button type="primary" onClick={this.showModal}>Show Modal</Button>
          <Button onClick={info}>Show info</Button>
          <Button onClick={confirm}>Show confirm</Button>
          <Popconfirm title="Question?">
            <a href="#">Click to confirm</a>
          </Popconfirm>
        </div>
        <div className="example">
          <Transfer
            dataSource={[{key: 1, title: "Obj 1"}]}
            showSearch
            targetKeys={[]}
            render={item => item.title}
          />
        </div>
        <div style={{ width: 319, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar fullscreen={false} value={moment()} />
        </div>
        <div className="example">
          <Table dataSource={[]} columns={columns} />
        </div>
        <Modal title="Locale Modal" visible={this.state.visible} onCancel={this.hideModal}>
          <p>Locale Modal</p>
        </Modal>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: null,
    };

    this.changeLocale = this.changeLocale.bind(this);
  }

  changeLocale(e) {
    e.preventDefault();
    const localeValue = e.target.value;
    this.setState({ locale: localeValue });
    if (!localeValue) {
      moment.locale('en');
    } else if(localeValue === zhCN) {
      moment.locale('zh-cn');
    } else if(localeValue === frFR) {
      moment.locale('fr');
    } else if(localeValue === deDE) {
      moment.locale('de');
    }
  }

  render() {
    const { locale } = this.state;
    return (
      <div>
        <div className="change-locale">
          <span style={{ marginRight: 16 }}>Change locale of components: </span>
          <Radio.Group defaultValue={undefined} onChange={this.changeLocale}>
            <Radio.Button key="en" value={undefined}>English</Radio.Button>
            <Radio.Button key="cn" value={zhCN}>中文</Radio.Button>
            <Radio.Button key="fr" value={frFR}>Français</Radio.Button>
            <Radio.Button key="de" value={deDE}>Deutsch</Radio.Button>
          </Radio.Group>
        </div>
        <LocaleProvider locale={locale}>
          <Page key={locale ? locale.locale : 'en'/* Have to refresh for production environment */} />
        </LocaleProvider>
      </div>
    );
  }
}

// render(<App />, document.getElementById("root"));

// .locale-components {
//   border-top: 1px solid #d9d9d9;
//   padding-top: 16px;
// }
//
// .example {
//   margin: 16px 0;
// }
//
// .example > * {
//   margin-right: 8px;
// }
//
// .change-locale {
//   margin-bottom: 16px;
