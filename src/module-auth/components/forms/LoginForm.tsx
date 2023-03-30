import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import { useForm } from 'react-hook-form';
import * as joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { RegexConstants } from '../../../shared/constants/regex.constants';
import Typography from '@mui/material/Typography';
import NavigationButtons from '../../../shared/components/button/NavigationButtons';
import { FormProps } from '../../../shared/models/form';
import { Key, NavigateNext } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

interface FormValues {
  apiKey: string;
}

export default function LoginForm({ onSubmit, loading, disabled }: FormProps<string>) {
  const schema = joi.object({
    apiKey: joi
      .string()
      .uuid()
      .label(TranslationConstants.LABELS.API_KEY)
      .messages({
        'string.pattern.base': `"${TranslationConstants.LABELS.API_KEY}" must be a valid GUID`,
      }),
  });
  const { register, formState, handleSubmit } = useForm<FormValues>({
    defaultValues: { apiKey: '' },
    resolver: joiResolver(schema),
    mode: 'onChange',
  });
  const { errors } = formState;

  const handleFormSubmit = (formValues: FormValues) => onSubmit(formValues.apiKey);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {TranslationConstants.LABELS.LOGIN_TITLE}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {TranslationConstants.LABELS.LOGIN_TEXT}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label={TranslationConstants.LABELS.API_KEY}
              placeholder={TranslationConstants.PLACEHOLDERS.API_KEY}
              fullWidth
              autoComplete="current-password"
              variant="standard"
              error={!!errors.apiKey?.message}
              helperText={errors.apiKey?.message}
              {...register('apiKey')}
              disabled={disabled || loading}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 3,
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ ml: 1 }}
            disabled={!formState.isValid || disabled}
            loading={loading}
            endIcon={<Key />}
            loadingPosition="end"
          >
            {TranslationConstants.BUTTONS.LOGIN}
          </LoadingButton>
        </Box>
      </form>
    </Fragment>
  );
}
