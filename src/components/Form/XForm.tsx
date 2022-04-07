import React from 'react';
import FormTextInput from './FormTextInput';
import FormDivision from './FormDivision';
import FormButtonFooter from './FormButtonFooter';
import FormButton from './Button';
import FormCheckbox from './FormCheckbox';
import FormTextArea from './FormTextArea';
import FormSelectInput from './FormSelectInput';
import FormInline from './FormInline';
import FormRadio from './FormRadio';
import FormInputGroup from './FormInputGroup';
import FormGroup from './FormGroup';

function XForm(props: React.PropsWithChildren<React.HTMLProps<HTMLFormElement>>) {
  return <form {...props}>{props.children}</form>;
}

XForm.Text = FormTextInput;
XForm.Division = FormDivision;
XForm.Footer = FormButtonFooter;
XForm.Button = FormButton;
XForm.Check = FormCheckbox;
XForm.TextArea = FormTextArea;
XForm.Select = FormSelectInput;
XForm.Inline = FormInline;
XForm.Radio = FormRadio;
XForm.InputGroup = FormInputGroup;
XForm.Group = FormGroup;

export default XForm;
