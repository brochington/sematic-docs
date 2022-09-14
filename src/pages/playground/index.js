import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  Box,
  Grid,
  Group,
  Button,
  Title,
  Text,
  TextInput,
  ScrollArea,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
// import { useColorScheme } from '@mantine/hooks';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNDgyMzRhOC03MjI2LTQ1YjctOGZiYi1kNGI1MDA5MjUzZTAiLCJleHAiOjE2NzU3NjM4Njl9.FQsKnhq3p88TOgXVOacYifDhtKPHoqs-RI1kGfh6DQA';

async function request(text) {
  // let resp = await fetch('http://localhost:8088/text-to-json', {
  let resp = await fetch('https://api.sematle.com/text-to-json', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
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
  // const colorScheme = useColorScheme();

  const form = useForm({
    initialValues: {
      text: '',
    },

    validate: {
      text: (value) => (value.length > 0 ? null : 'Text is required'),
    },
  });

  const [json, setJson] = useState({});

  async function getJson(text) {
    let json = await request(text);
    console.log(json);
    setJson(json);
  }

  return (
    <Layout title="Sematle Playground">
      <Box m="lg">
        <Title order={1} sx={{ fontSize: '60px' }} mb="lg">
          Sematle Playground
        </Title>
        {/* <Text>This is a testing ground</Text> */}
        <Grid grow>
          <Grid.Col span={6}>
            <Box mt="lg">
              <form onSubmit={form.onSubmit((v) => getJson(v.text))}>
                <TextInput
                  mb="md"
                  required
                  label="Sentence"
                  placeholder="The quick brown fox jumps over the lazy dog"
                  {...form.getInputProps('text')}
                />
                -- or --
                <Select
                  mt="md"
                  label="Choose example sentence"
                  placeholder="select"
                  data={[
                    { label: 'Create a folder', value: 'Create a folder' },
                    { label: 'Jane Smith baked a cake for Thomas on January 21 , 1990', value: 'Jane Smith baked a cake for Thomas on January 21 , 1990' },
                    { label: 'The quick brown fox jumps over the lazy dog', value: 'The quick brown fox jumps over the lazy dog' },
                    { label: `How many people are coming to your party?`, value: `How many people are coming to your party?` },
                    { label: `Portfolio managers expect interest rates to decline further`, value: `Portfolio managers expect interest rates to decline further` },
                    { label: `Move my meeting with John to next Tuesday`, value: `Move my meeting with John to next Tuesday` },
                  ]}
                  onChange={(text) => form.setValues({ text })}
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
                      // theme={colorScheme === 'light' ? 'summerfruit:inverted' : 'monokai'}
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
