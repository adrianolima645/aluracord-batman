import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export default function MessageList(props) {
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
                                <Image src={mensagem.texto.replace(':sticker:', '')} styleSheet={{width:'20%'}} />
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