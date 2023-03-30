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

interface UrlFormValues {
  url: string;
}

export default function UrlForm({ onSubmit, loading, disabled }: FormProps<string>) {
  const schema = joi.object({
    url: joi
      .string()
      .uri({ allowRelative: true })
      .label(TranslationConstants.LABELS.URL)
      .regex(RegexConstants.YOUTUBE.YOUTUBE_URL_REGEX)
      .messages({
        'string.pattern.base': `"${TranslationConstants.LABELS.URL}" must be a valid youtube video, playlist or album url`,
      }),
  });
  const { register, formState, handleSubmit } = useForm<UrlFormValues>({
    defaultValues: { url: '' },
    resolver: joiResolver(schema),
    mode: 'onChange',
  });
  const { errors } = formState;

  const handleFormSubmit = (formValues: UrlFormValues) => onSubmit(formValues.url);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {TranslationConstants.LABELS.URL_STEP_TITLE}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label={TranslationConstants.LABELS.URL}
              placeholder={TranslationConstants.PLACEHOLDERS.YOUTUBE_URL}
              fullWidth
              autoComplete="url"
              variant="standard"
              error={!!errors.url?.message}
              helperText={errors.url?.message}
              {...register('url')}
              disabled={disabled || loading}
            />
          </Grid>
        </Grid>
        <NavigationButtons
          isSubmitButton
          showBackButton={false}
          canProgress={formState.isValid && !disabled}
          isProgressing={loading}
          gutterTop
        ></NavigationButtons>
      </form>
    </Fragment>
  );
}
