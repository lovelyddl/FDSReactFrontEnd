import React from 'react';
import { Loader } from 'semantic-ui-react';
import '../assets/css/loading.scss';

const Loading = () => (
  <div className="loading-page">
     <Loader size='huge' active inline='centered' />
  </div>

)

export default Loading