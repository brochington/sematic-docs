import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Box, Grid, Group, Button, Title, Text, TextInput, ScrollArea } from '@mantine/core';
import { useForm } from '@mantine/form';

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
  const form = useForm({
    initialValues: {
      text: '',
    },

    validate: {
      text: (value) => (value.length > 0 ? null : 'Text is required'),
    },
  });

  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog'
  );
  const [json, setJson] = useState({});

  async function getJson(text) {
    let json = await request(text);
    console.log(json);
    setJson(json);
  }

  return (
    <Layout title="Playground">
      <Box m="lg">
        <Title order={1} sx={{ fontSize: '60px' }}>
          Playground
        </Title>
        {/* <Text>This is a testing ground</Text> */}
        <Grid grow>
          <Grid.Col span={6}>
            <Box mt="lg">
              <form onSubmit={form.onSubmit((v) => getJson(v.text))}>
                <TextInput
                  required
                  label="Sentence"
                  placeholder="The quick brown fox jumps over the lazy dog"
                  {...form.getInputProps('text')}
                />
                <Group position="left" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <ScrollArea style={{ height: 'calc(100vh - 450px)' }} type="auto">
              <BrowserOnly
                fallback={
                  <div>Unable to render react-json-view server-side.</div>
                }
              >
                {() => {
                  const ReactJson = require('react-json-view').default;
                  return json ? (
                    <ReactJson
                      // theme={'tube'}
                      src={json['sema_sentences']}
                      displayObjectSize={false}
                      displayDataTypes={false}
                    />
                  ) : null;
                }}
              </BrowserOnly>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Box>
    </Layout>
  );
}
