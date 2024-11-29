import React from 'react';
import { Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, TextField, Button, Box, useTheme } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import './detail.css';

const ContactezNous = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box className="contact-page" sx={{ py: 8 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
              Contactez-nous
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
              N'hésitez pas à nous contacter pour toute question ou demande d'information.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="contact@exemple.com" sx={{ color: isDarkMode ? 'white' : 'inherit' }} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary="+123 456 7890" sx={{ color: isDarkMode ? 'white' : 'inherit' }} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: isDarkMode ? 'white' : 'inherit' }}>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary="Adresse, Ville, Pays" sx={{ color: isDarkMode ? 'white' : 'inherit' }} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <form>
              <TextField
                fullWidth
                margin="normal"
                id="formName"
                label="Nom"
                variant="outlined"
                required
                InputLabelProps={{ style: { color: isDarkMode ? 'white' : 'inherit' } }}
                InputProps={{ style: { color: isDarkMode ? 'white' : 'inherit' } }}
              />
              <TextField
                fullWidth
                margin="normal"
                id="formEmail"
                label="Email"
                type="email"
                variant="outlined"
                required
                InputLabelProps={{ style: { color: isDarkMode ? 'white' : 'inherit' } }}
                InputProps={{ style: { color: isDarkMode ? 'white' : 'inherit' } }}
              />
              <TextField
                fullWidth
                margin="normal"
                id="formMessage"
                label="Message"
                multiline
                rows={5}
                variant="outlined"
                required
                InputLabelProps={{ style: { color: isDarkMode ? 'white' : 'inherit' } }}
                InputProps={{ style: { color: isDarkMode ? 'white' : 'inherit' } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Envoyer
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactezNous;
