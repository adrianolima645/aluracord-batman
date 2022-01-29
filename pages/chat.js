import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

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

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log(props.username);
    function isEqualUser(username, autor) {
        if(username === autor) return true;
        return false;
    }
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                overflowX:'hidden',
            }}
        >
            {props.mensagens.map((mensagem) => {
                let username = props.username;
                let autor = mensagem.de;
                let igual = isEqualUser(username, autor);
                let styleSheet = {
                    width: {"Breakpoints.xs": '90%', "Breakpoints.sm": '85%', "Breakpoints.md":'80%', "Breakpoints.lg": '70%', "Breakpoints.xl": '60%'},
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                };
                if (igual) {
                    styleSheet = {
                        ...styleSheet,
                        alignSelf: 'flex-end',
                        backgroundColor: appConfig.theme.colors.primary[100],
                    };
                };
                let dataM = new Date(mensagem.created_at.toString());
                return (
                     <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={styleSheet}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    hover: {
                                        width: '50px',
                                        height: '50px',
                                    },
                                    transitionDuration: '0.5s'
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {`${dataM.getDate()}/${dataM.getMonth()+1}/${dataM.getFullYear()} ás ${dataM.getHours()}:${dataM.getMinutes()}`}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}
                    </Text>
                );
            })}
        </Box>
    );
}