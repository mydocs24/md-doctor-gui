/**
 * @author A.Zagovorichev <zagovorichev@gmail.com>
 * 9/5/2017.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// lang
Vue.use(VueI18n)
// ready translated locales
const messages = {
  en: {
    'Status not defined': 'Status not defined',
    'Send Error': 'Send Error',
    'Send selected items to the director': 'Send selected items to the director',
    'Terms': 'Terms',
    'Privacy': 'Privacy',
    'Help': 'Help',
    'Cases have not been loaded': 'Cases have not been loaded',
    'Are you sure?': 'Are you sure?',
    'Yes': 'Yes',
    'No': 'No',
    'Mark as passport': 'Mark as passport',
    'Download': 'Download',
    'Mark as insurance': 'Mark as insurance',
    'Document has not been moved': 'Document has not been moved',
    'Can not get documents': 'Can not get documents',
    'View': 'View',
    'Document': 'Document',
    'Type': 'Type',
    'This patient has no documents. You need to load them firstly.': 'This patient has no documents. You need to load them firstly.',
    'Error on image uploading': 'Error on image uploading',
    'Information about patient': 'Information about patient',
    'About patient': 'About patient',
    'Server error': 'Server error',
    'Patient name does not provided': 'Patient name does not provided',
    'Fill': 'Fill',
    'To': 'To',
    'From': 'From',
    'Find': 'Find',
    'Reset': 'Reset',
    'Name, Phone, or Email': 'Name, Phone, or Email',
    'Search for': 'Search for',
    'Filters': 'Filters',
    'Not set': 'Not set',
    'Accident saved': 'Accident saved',
    'Success': 'Success',
    'Select Services': 'Select Services',
    'Select Surveys': 'Select Surveys',
    'Can\'t create diagnostic': 'Can\'t create diagnostic',
    'Can\'t save accident': 'Can\'t save accident',
    'API Error': 'API Error',
    'Select Diagnostics': 'Select Diagnostics',
    'Diagnostics': 'Diagnostics',
    'Diagnostic': 'Diagnostic',
    'Add': 'Add',
    'New': 'New',
    'Choose': 'Choose',
    'Symptoms': 'Symptoms',
    'Logout': 'Logout',
    'Medical Board Number': 'Medical Board Number',
    'MBN': 'MBN',
    'MeDoctor': 'MeDoctor',
    'Log In': 'Log In',
    'Forgot Password': 'Forgot Password',
    'Login Failed': 'Login Failed',
    'Failed to authenticate': 'Failed to authenticate',
    message: {
      hello: 'hello world',
      open: 'Open'
    },
    'case': {
      status: {
        closed: 'Closed',
        'signed': 'Signed',
        sent: 'Sent',
        'new': 'New',
        processing: 'In Progress'
      }
    },
    'Date': 'Date',
    'Referral Num': 'Referral Num',
    'city': 'city',
    'Status': 'Status',
    'Total': 'Total',
    'Copy': 'Copy',
    'Sign': 'Sign',
    'Send': 'Send',
    'Show filters': 'Show filters',
    'Hide filters': 'Hide filters',
    'My Cases': 'My Cases',
    'Close': 'Close',
    'Loading...': 'Loading...',
    'First Appointment': 'First Appointment',
    'Reiterative Appointment': 'Reiterative Appointment',
    'About': 'About',
    'Edit': 'Edit',
    'City': 'City',
    'Reject': 'Reject',
    'Accept': 'Accept',
    'Decline': 'Decline',
    'Open': 'Open',
    'Referral Number': 'Referral Number',
    'Phone': 'Phone',
    'Address': 'Address',
    'Commentary': 'Commentary',
    'Confirmation': 'Confirmation',
    'You\'ll sign selected cases': 'You\'ll sign selected cases',
    'You\'ll send selected cases': 'You\'ll send selected cases',
    'Select services': 'Select services',
    'Add new service': 'Add new service',
    'Case type': 'Case type',
    'Survey': 'Survey',
    'Add survey': 'Add survey',
    'Diagnose': 'Diagnose',
    'Additional investigation': 'Additional investigation',
    'Services': 'Services',
    'Service': 'Service',
    'Description': 'Description',
    'Delete': 'Delete',
    'New service': 'New service',
    'Title': 'Title',
    'Service title': 'Service title',
    'Service description': 'Service description',
    'Price': 'Price',
    'Save': 'Save',
    'Cancel': 'Cancel',
    'All fields should be filled': 'All fields should be filled',
    'Request Error': 'Request Error',
    'Reject Reason': 'Reject Reason',
    'Reject Case': 'Reject Case',
    'MyDoctors24.com': 'MyDoctors24.com',
    'root_url': 'https://mydoctors24.com',
    'Surveys': 'Surveys',
    'Select surveys': 'Select surveys',
    'Add new survey': 'Add new survey',
    'New Survey': 'New Survey',
    'Survey title': 'Survey title',
    'Survey description': 'Survey description',
    'Patient City': 'Patient City',
    'Reason of treatment': 'Reason of treatment',
    'Patient Address': 'Patient Address',
    'Patient Name': 'Patient Name',
    'Name': 'Name',
    'Edit patient data': 'Edit patient data',
    'All fields are required': 'All fields are required',
    'Main': 'Main',
    'Reason should be provided': 'Reason should be provided',
    'Additional Investigation': 'Additional Investigation',
    'Passport': 'Passport',
    'Insurance': 'Insurance',
    'Take a photo': 'Take a photo',
    'Take a new photo': 'Take a new photo',
    'Documents': 'Documents'
  }
}

// Create VueI18n instance with options
export default new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})
