import { Box, TextField } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import Header from '../src/components/Header';
import MessageList from '../src/components/MessageList';
import Spinner from '../src/components/Spinner';

const SUPABASE_ANON_PUBLIC = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyNzI3NywiZXhwIjoxOTU4OTAzMjc3fQ.3kqeL4OEClMXcQsya1Eaci6A6CcCGrbnq9jgzS3Ed5Q';
const SUPABASE_URL = 'https://litrzuatntqbfvubghds.supabase.co';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC);

function getMensagensTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (data) => {
            adicionaMensagem(data.new);
        })
        .subscribe();
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [mensagens, setMensagens] = React.useState([]);
    const roteamento = useRouter();
    const username = roteamento.query.username;

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            .then(async ({ data }) => {
                setMensagens(data);
            });
        getMensagensTempoReal((novaMensagem) => {
            setMensagens((valorAtualListaMensagem) => {
                return [
                    novaMensagem,
                    ...valorAtualListaMensagem,
                ]
            });
        }); 
    }, []);

    function handleNovaMensagem(novaMensagem) {

        if (novaMensagem.length <= 0) {
            return;
        }
        const mensagem = {
            // id: mensagens.length,
            de: username,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({data}) => {
                setMensagem('');
            })

        
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'left', paddingLeft: '2%',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i0.wp.com/critical-room.com/wp-content/uploads/2020/09/1_nrif7psqk3xz4j7q2opacq.jpeg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: {"Breakpoints.xs": '98%', "Breakpoints.sm": '98%', "Breakpoints.md":'90%', "Breakpoints.lg": '80%', "Breakpoints.xl": '70%'},
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {mensagens.length === 0 && <Spinner/>}
                    <MessageList mensagens={mensagens} username={username}/>

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/* CallBack */}
                        <ButtonSendSticker
                        onStickerClick={(sticker) => {
                            // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                            handleNovaMensagem(':sticker: ' + sticker);
                        }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
