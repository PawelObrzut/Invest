import { Card, CardContent, Box, Typography, useTheme, Stack } from '@mui/material';
import type { ReactNode } from 'react';

type DataCardProps = {
  header?: {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
  };
  trend?: 'up' | 'down' | null;
  value?: string | number;

  details?: Array<{
    label: string;
    value: string | number;
    color?: 'mint' | 'error' | 'inherit';
  }>;

  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const DataCard = ({
  header,
  value,
  details,
  children,
  onClick,
  className,
}: DataCardProps) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: "primary.main",
        },
      }}
      className={className}
    >
      <CardContent
        sx={{
          padding: '1.5rem',
          '&:last-child': {
            paddingBottom: '1.5rem',
          },
        }}
      >
        {children ? (
          children
        ) : (
          <Stack spacing={1}>
            {header && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box 
                  sx={{ display: 'flex' }}
                >
                  <Stack>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {header.title}
                    </Typography>
                    {header.subtitle && (
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.grey[500] }}
                      >
                        {header.subtitle}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Box>
            )}

            {value && (
              <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
              >
                {value}
              </Typography>
            )}

            {details?.length ? (
              <Stack spacing={0.5} sx={{ mt: 1 }}>
                {details.map((detail) => (
                  <Box key={detail.label}>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.grey[500], display: 'block' }}
                    >
                      {detail.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: detail.color === 'error' ? theme.palette.error.main : detail.color === 'mint' ? theme.palette.primary.main : theme.palette.text.primary }}
                    >
                      {detail.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : null}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default DataCard;
