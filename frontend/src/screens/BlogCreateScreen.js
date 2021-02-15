import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import parse from 'html-react-parser';

const BlogCreateScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  return (
    <>
      <Link to='/admin/bloglist' className='btn btn-light my-3'>
        <i class='fas fa-arrow-left'></i> Go Back
      </Link>
      <FormContainer>
        <div className='editor'>
          <CKEditor
            editor={ClassicEditor}
            config={{
              ckfinder: {
                uploadUrl: '/ckeditor/upload',
              },
            }}
            onInit={(editor) => {}}
            data={text}
            onChange={(e, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
        </div>
        <div>
          <h2>Content</h2>
          <p>{text}</p>
        </div>
      </FormContainer>
    </>
  );
};

export default BlogCreateScreen;
