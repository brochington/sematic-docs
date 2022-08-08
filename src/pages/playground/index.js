import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import ReactJson from 'react-json-view';
import BrowserOnly from '@docusaurus/BrowserOnly';

// const MyComponent = (props) => {
//   return (
//     <BrowserOnly fallback={<div>Loading...</div>}>
//       {() => {
//         const LibComponent = require('some-lib').LibComponent;
//         return <LibComponent {...props} />;
//       }}
//     </BrowserOnly>
//   );
// };

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNDgyMzRhOC03MjI2LTQ1YjctOGZiYi1kNGI1MDA5MjUzZTAiLCJleHAiOjE2NzU3NjM4Njl9.FQsKnhq3p88TOgXVOacYifDhtKPHoqs-RI1kGfh6DQA';

async function request(text) {
  let resp = await fetch('https://api.preview-api.sematic.rocks/text-to-json', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      sentences: [text],
    }),
  });

  let json = await resp.json();
  return json;
}

export default function Playground() {
  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog'
  );
  const [json, setJson] = useState(null);

  async function getJson() {
    let json = await request(text);
    console.log(json);
    setJson(json);
  }

  return (
    <Layout title="Playground">
      <div>
        <input
          type="text"
          onChange={(evt) => setText(evt.target.value)}
          value={text}
        />
        <button onClick={getJson}>submit</button>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
            const ReactJson = require('react-json-view').default;
            return json ? (
              <ReactJson
                src={json.sema_sentences[0]}
                displayObjectSize={false}
                displayDataTypes={false}
              />
            ) : null;
          }}
        </BrowserOnly>
      </div>
    </Layout>
  );
}
