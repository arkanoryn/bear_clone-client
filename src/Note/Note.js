import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const Note = () =>
  <Content style={{ margin: '24px', overflow: 'initial' }}>
<div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
...
 <br />
Really
<br />...<br />...<br />...<br />
long
<br />...<br />...<br />...<br />...<br />...<br />...
                                                    <br />...<br />...<br />...<br />...<br />...<br />...
                                                                                                        <br />...<br />...<br />...<br />...<br />...<br />...
                                                                                                                                                            content
</div>
</Content>

export default Note;
