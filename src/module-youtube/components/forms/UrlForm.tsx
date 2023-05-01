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
import MenuItem from '@mui/material/MenuItem';
import { MusicConstants } from '../../../shared/constants/music.constants';
import { PreferenceStorage } from '../../../shared/storage/preference/PreferenceStorage';
import { FormControlLabel, FormHelperText, SelectChangeEvent } from '@mui/material';

export interface UrlFormProps {
  initialUrl?: string | null;
}

export interface UrlFormValues {
  url: string;
  container: string;
}
export default function UrlForm({ initialUrl, onSubmit, loading, disabled }: FormProps<UrlFormValues> & UrlFormProps) {
  const schema = joi.object({
    url: joi
      .string()
      .uri({ allowRelative: true })
      .label(TranslationConstants.LABELS.URL)
      .regex(RegexConstants.YOUTUBE.YOUTUBE_URL_REGEX)
      .messages({
        'string.pattern.base': `"${TranslationConstants.LABELS.URL}" must be a valid youtube video, playlist or album url`,
      }),
    container: joi.string().required(),
  });
  const { register, formState, handleSubmit } = useForm<UrlFormValues>({
    defaultValues: {
      url: initialUrl ?? '',
      container: PreferenceStorage.getContainerPreference() ?? MusicConstants.CONTAINERS.MP3,
    },
    resolver: joiResolver(schema),
    mode: 'onChange',
  });
  const { errors } = formState;

  const handleFormSubmit = (formValues: UrlFormValues) => onSubmit(formValues);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {TranslationConstants.LABELS.URL_STEP_TITLE}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <TextField
              required
              label={TranslationConstants.LABELS.URL}
              fullWidth
              autoComplete="url"
              variant="standard"
              error={!!errors.url?.message}
              helperText={errors.url?.message}
              {...register('url')}
              disabled={disabled || loading}
            />
            <FormHelperText>{TranslationConstants.PLACEHOLDERS.YOUTUBE_URL}</FormHelperText>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              select
              defaultValue={formState.defaultValues?.container}
              label={TranslationConstants.LABELS.CONTAINER}
              helperText={TranslationConstants.PLACEHOLDERS.CONTAINER}
              fullWidth
              variant="standard"
              {...register('container', {
                onChange: (e: SelectChangeEvent) => PreferenceStorage.setContainerPreference(e.target.value),
              })}
              disabled={disabled || loading}
            >
              <MenuItem value={MusicConstants.CONTAINERS.MP3}>{TranslationConstants.LABELS.MP3}</MenuItem>
              <MenuItem value={MusicConstants.CONTAINERS.OGG}>{TranslationConstants.LABELS.OGG}</MenuItem>
            </TextField>
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
