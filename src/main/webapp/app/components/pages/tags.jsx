import React from 'react';

const TagsPage = React.createClass({
  render() {
    return (
      <div>
        <h1>Список тегов</h1>

        <div className="tags">
              <div style="float: left"><a href="tags?id=tag.id" className="post-tag" title="показать вопросы с меткой «tag.name»" rel="tag">tag.name</a> <span style="padding-right: 6px; color: #777; font-size: 11px">x tag.popular</span></div> 
        </div>
        <div style="clear:both; padding: 10px;"></div>
      </div>
    );
  }
});

export default TagsPage;