import React from 'react';
import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';
/**
 * Componente para exibir um spinner
 * em tela. Útil para indicar ao usuário
 * que algo está sendo processado
 */
export default function Spinner({ description = 'Aguarde...' }) {
  return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', height:'100%'
            }}
        >
            <Image src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3b29b223-1992-414b-849b-4ab6ecea943c/dbg4hlw-0e3b8e83-54fa-4465-9169-3fe49f7e22a9.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNiMjliMjIzLTE5OTItNDE0Yi04NDliLTRhYjZlY2VhOTQzY1wvZGJnNGhsdy0wZTNiOGU4My01NGZhLTQ0NjUtOTE2OS0zZmU0OWY3ZTIyYTkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uX08WksTmpq2QQ5XH4TZWc9vz-SfDET-uEGh7vr-92I" styleSheet={{width:'20%'}} />
        </Box>
  );
}
