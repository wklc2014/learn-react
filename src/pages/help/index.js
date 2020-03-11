import React, { Component } from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import styles from './styles.less';

class Help extends Component {

  static defaultProps = {

  }

  handleScroll(scrollData){
    // console.log(scrollData);
  }

  render() {
    // const { } = this.props;

    return (
      <div>
        <h2>Help</h2>
        <div>react-smooth-scrollbar</div>
        <div >
          <Scrollbar
            onScroll={this.handleScroll}
            className={styles.box}
            >
            <div>
              <p>在你心中，什么样的车才算好车？在中国，就有四款汽车被国人封为"神车"，其中有的销量够牛、有的历史悠久、耐用性强等等，而这四款神车都有一个共同点：高品质。</p>
              <p>大众作为最早一批进入中国市场，不少车主都有一种"大众情怀"。大众桑塔纳就是国人眼中的"神车"。作为第一辆全中国普及，而且耐用省油的合资车，在当时买一辆桑塔纳，那就是小资家庭的象征。</p>
              <p>韩系现代车在中国其实并不受待见。但有一说一，多次被各大出租车公司特指点名的现代悦动，喜得各位老司机的青睐。我们知道，老司机最烦两件事：加油、维修。能耐得住老师傅"豪迈奔放"的开车技术，并被"阅车无数"的老司机称赞的好车，其实并不多。</p>
              <p>车企中，最会"闷声发大财"当属日产。 无论丰田本田怎么争来争去，日产一直霸占着全球的销量前五的排行榜，并且黑历史及黑点特别少。销量"扛把子"轩逸，轩逸目前已经更新到14代，并且在19年全年总共卖出46多万辆，力压大众朗逸和丰田卡罗拉。</p>
              <p>保值神器"汉兰达"，就凭这一点，就足够让他成为老百姓眼中的"神车"。拥有霸气豪迈外观，其三大件：发动机、变速箱、底盘也都是丰田自家研发的技术，如此原汁原味的汉兰达，不少车主表示：开50万公里，发动机、变速箱无大修。</p>
            </div>
          </Scrollbar>
        </div>
      </div>
    )
  }

}

Help.propTypes = {

}

export default Help;
