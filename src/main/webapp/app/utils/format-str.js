var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}


export default function formatText(comment) {
  // bold texts
  // comment.match(/\*(.*?)\*/gi).map(i => {
  //   <pre class="language-"><code class="language-"></code></pre>
  // });


  // let html = safe_tags_replace(comment);
  let html = comment;

  // console.log(html);
  
  // comment.match(/```(.*?)```/gi).map(text => {
  const codeFragments = comment.match(/```([\s\S]*?)```/gi) || [];

  codeFragments.map(text => {
    const code = Prism.highlight(text.slice(3, -3), Prism.languages.javascript);
    html = html.replace(text, `<pre class="language-"><code class="language-">${code}</code></pre>`);
  });

  // console.log(html);

  const codeInlineFragments = html.match(/`(.*?)`/gi) || [];
  
  // console.log(codeInlineFragments);

  codeInlineFragments.map(text => {
    const code = text.slice(1, -1);
    html = html.replace(text, `<span class="code-inline">${code}</span>`);
  });

  const boldFragments = html.match(/\*(.*?)\*/gi) || [];

  boldFragments.map(text => {
    const code = text.slice(1, -1);
    html = html.replace(text, `<strong>${code}</strong>`);
  });


  // var code = "var data = 1;";
  // var html = Prism.highlight(code, Prism.languages.javascript);
  return html.replace(/\n\n/g, "<br /><br />");;
};