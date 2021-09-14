import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  paper:{
    padding: theme.spacing(2),
    borderRadius: '10px'
  },
  loading:{
    display: 'flex',
    width: '100%',
    height: '80vh',
    alignItems: 'center',
    justifyContent: 'center',
  },

  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: '10px'
    },
  },
  imageSection: {
    marginLeft: '15px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: '10px'
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  
  commentsInner: {
    height: '200px',
    overflowY: 'auto',
  },
  postDestailContainer:{
    [theme.breakpoints.down('sm')]:{
      flexDirection: 'column-reverse'
    }
  }

}));
