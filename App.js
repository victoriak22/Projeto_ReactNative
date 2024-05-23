import * as React from 'react';
import { TextInput, Text, View, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: undefined,
      senha: undefined,
    };

    this.som = new Audio.Sound();
  }

  async componentDidMount() {
    try {
      await this.som.loadAsync(require('./assets/som_intro.wav'));
    } catch (error) {
      console.log('Erro ao carregar o som:', error);
    }
  }

  tocar = async () => {
    try {
      await this.som.setPositionAsync(0);
      await this.som.playAsync();
    } catch (error) {
      console.log('Erro ao tocar o som:', error);
    }
  };

  ler = async () => {
    try {
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if (senha != null) {
        if (senha == this.state.senha) {
          this.tocar();
          this.props.navigation.navigate("Catálogo");
        } else {
          alert("Usuário ou senha incorretos!");
        }
      } else {
        alert("Usuário não encontrado!");
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  render() {
    return (
      <View style={estilos.container}>
        <LinearGradient
          style={estilos.container}
          colors={["#84d2ff", "#e52e71", "#e52e71", "#e52e71", "#84d2ff"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
          <Image
            style={estilos.imagem}
            source={require("./assets/logo.png")}
          />
          <Text style={estilos.texto}>{"Login:"}</Text>
          <TextInput
            style={estilos.caixa}
            onChangeText={(texto) => this.setState({ usuario: texto })}
          />
          <Text style={estilos.texto}>{"Senha:"}</Text>
          <TextInput
            style={estilos.caixa}
            secureTextEntry={true}
            onChangeText={(texto) => this.setState({ senha: texto })}
          />
          <Button title="Login" onPress={this.ler} />
        </LinearGradient>
      </View>
    );
  }
}

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      password: undefined,
    };
  }

  async gravar() {
    try {
      await AsyncStorage.setItem(this.state.user, this.state.password);
      alert("Salvo com sucesso!!!");
    } catch (erro) {
      alert("Erro!");
    }
  }

  render() {
    return (
      <View style={estilos.container}>
        <LinearGradient
          style={estilos.container}
          colors={["#84d2ff", "#e52e71", "#e52e71", "#e52e71", "#84d2ff"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
          <Image
            style={estilos.imagem}
            source={require("./assets/logo.png")}
          />
          <Text style={estilos.texto}>{"Cadastrar usuário:"}</Text>
          <TextInput
            style={estilos.caixa}
            onChangeText={(texto) => this.setState({ user: texto })}
          />
          <Text style={estilos.texto}>{"Cadastrar senha:"}</Text>
          <TextInput
            style={estilos.caixa}
            secureTextEntry={true}
            onChangeText={(texto) => this.setState({ password: texto })}
          />
          <Button title="Cadastrar" onPress={() => this.gravar()} />
        </LinearGradient>
      </View>
    );
  }
}

class Nav2 extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Principal} />
        <Stack.Screen name="Catálogo" component={Catalogo} />
        <Stack.Screen name="Perfumes" component={Perfumes} />
        <Stack.Screen name="Yves Saint Laurent" component={Perfume1} />
        <Stack.Screen name="Estée Lauder" component={Perfume2} />
        <Stack.Screen name="Carolina Herrera" component={Perfume3} />
        <Stack.Screen name="Clinique" component={Creme1} />
        <Stack.Screen name="Shiseido" component={Creme2} />
        <Stack.Screen name="Rare Beauty" component={Creme3} />
        <Stack.Screen name="Rare Beauty Blush" component={Maquiagem1} />
        <Stack.Screen name="Too Faced" component={Maquiagem2} />
        <Stack.Screen name="Laura Mercier" component={Maquiagem3} />
        <Stack.Screen name="Korres" component={Sabonete1} />
        <Stack.Screen name="Sol de Janeiro" component={Sabonete2} />
        <Stack.Screen name="Feito Brasil" component={Sabonete3} />
        <Stack.Screen name="Banderas Black" component={Desodorante1} />
        <Stack.Screen name="Banderas Seduction" component={Desodorante2} />
        <Stack.Screen name="212 VIP MEN" component={Desodorante3} />
        <Stack.Screen name="Cremes" component={Cremes} />
        <Stack.Screen name="Maquiagens" component={Maquiagens} />
        <Stack.Screen name="Sabonetes" component={Sabonetes} />
        <Stack.Screen name="Desodorantes" component={Desodorantes} />
        <Stack.Screen name="Sacola" component={Sacola} />
      </Stack.Navigator>
    );
  }
}

class Sacola extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sacola: [],
    };
  }

  adicionarProduto = (produto) => {
    this.setState((prevState) => ({
      sacola: [...prevState.sacola, produto],
    }));
  };

  removerProduto = (index) => {
    this.setState((prevState) => ({
      sacola: prevState.sacola.filter((_, i) => i !== index),
    }));
  };

  calcularTotal = () => {
    return this.state.sacola.reduce((total, produto) => total + produto.preco, 0);
  };

  render() {
    return (
      <View style={estilos.container}>
        <Text style={estilos.textoSacola}>SACOLA</Text>
        {this.state.sacola.map((produto, index) => (
          <View key={index} style={estilos.itemSacola}>
            <Text>{produto.nome} - R$ {produto.preco.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => this.removerProduto(index)}>
              <Text style={estilos.botaoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={estilos.textoTotal}>Total: R$ {this.calcularTotal().toFixed(2)}</Text>
      </View>
    );
  }
}

class Desodorante3 extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
  }

  async componentDidMount() {
  try {
    await this.som.loadAsync(require('./assets/som_moeda.wav'));
    console.log('Som carregado com sucesso');
  } catch (error) {
    console.log('Erro ao carregar o som:', error);
  }
}

  tocar = async () => {
  try {
    console.log('Tocando som...');
    await this.som.setPositionAsync(0);
    await this.som.playAsync();
  } catch (error) {
    console.log('Erro ao tocar o som:', error);
  }
};

  comprarProduto = () => {
    this.tocar();
  };

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_desodorante3.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>CAROLINA HERRERA</Text>
          <Text style={estilos.subtituloProduto}>
            BODY SPRAY CAROLINA HERRERA 212 VIP MEN
          </Text>
          <Text style={estilos.descricaoProduto}>
            O homem 212 Vip é carismático, divertido, elegante, sofisticado, desejado e invejado. Para ele não basta apenas ir festa, ele é a festa.
            O Body Spray, que posui as mesmas notas olfativas do perfume, é um coquetel explosivo, possui Notas de Caviar Lima, que proporcionam pequenas explosões de entusiasmo e energia, Vodka Gelada com Hortelã Congelado que mantém o frescor. E para coroar temos o King Wood, conhecida como madeira real ela dá um toque tropical e terroso a esta fragrância única.
          </Text>
          <Text style={estilos.precoProduto}>R$ 209,00</Text>
          <TouchableOpacity style={estilos.botaoComprar} onPress={this.comprarProduto}>
            <Text style={estilos.textoBotaoComprar}>Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Desodorante2 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_desodorante2.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>BANDERAS SEDUCTION</Text>
          <Text style={estilos.subtituloProduto}>
            DESODORANTE ANTONIO BANDERAS KING OF SEDUCTION MASCULINO
          </Text>
          <Text style={estilos.descricaoProduto}>
          King of Seduction Desodorante Corporal importado masculino, de Antonio Banderas, traz uma visão refrescante da sedução masculina representada pelo sedutor supremo. Um homem que nunca se leva demasiado a sério, porque a experiência lhe ensinou que a verdadeira autoconfiança vem de ser autêntico. Um homem que nunca precisa se esforçar demais, porque a sedução é natural para ele. Um homem que sabe que a sedução não está no que você tem, mas naquilo que você é.
          </Text>
          <Text style={estilos.precoProduto}>R$ 41,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text
            style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "DESODORANTE ANTONIO BANDERAS KING OF SEDUCTION MASCULINO", preco: 41.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Desodorante1 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_desodorante1.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>BANDERAS BLACK</Text>
          <Text style={estilos.subtituloProduto}>
            DESODORANTE ANTONIO BANDERAS SEDUCTION IN BLACK MASCULINO
          </Text>
          <Text style={estilos.descricaoProduto}>
          Seduction in Black Desodorante Corporal importado masculino, de Antonio Banderas, possui uma fragrância sofisticada e casual, dedicada ao homem moderno e elegante, que confia no seu poder de sedução. Ao anoitecer, as luzes se apagam, dando mais intimidade a cada encontro. Com Seduction in Black, o jogo da sedução continua na escuridão da noite.
          </Text>
          <Text style={estilos.precoProduto}>R$ 46,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "DESODORANTE ANTONIO BANDERAS SEDUCTION IN BLACK MASCULINO", preco: 46.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Sabonete3 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_sabonete3.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>FEITO BRASIL</Text>
          <Text style={estilos.subtituloProduto}>
            CREME DE BANHO FEITO BRASIL TIGELA DE AÇAÍ
          </Text>
          <Text style={estilos.descricaoProduto}>
          Uma experiência única de banho e cultura! Com tensoativos suaves, o Creme de Banho Espumante Tigela de Açaí oferece um momento rico de hidratação e contemplação de brasilidade e ancestralidade, com o aroma único de Açaí. Um creme de banho com espuma suave biocompatível com a pele. Hidrata e cuida do corpo com a fragrância inesquecível de Açaí. Com tensoativos suaves do Coco e do Milho, a Tigela de Açaí propõe um momento de hidratação e energização em uma experiência incomparável de autocuidado, relaxamento e fragrância. Cada frasco acompanha uma cerâmica Marajoara com desenhos únicos feitos à mão.
          </Text>
          <Text style={estilos.precoProduto}>R$ 349,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "CREME DE BANHO FEITO BRASIL TIGELA DE AÇAÍ", preco: 349.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Sabonete2 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_sabonete2.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>SOL DE JANEIRO</Text>
          <Text style={estilos.subtituloProduto}>
            SABONETE CORPORAL RENOVADOR SOL DE JANEIRO BEIJA FLOR BODY WASH
          </Text>
          <Text style={estilos.descricaoProduto}>
          Esta lavagem corporal diária traz a renovação celular e fornece umidade vital. Uma alternativa suave de retinol, esqualano vegano e ácidos florais reabastecem para uma pele suave e resistente, enquanto o aroma de Cheirosa 68 transforma o seu chuveiro num jardim à beira-mar.
          </Text>
          <Text style={estilos.precoProduto}>R$ 149,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "SABONETE CORPORAL RENOVADOR SOL DE JANEIRO BEIJA FLOR BODY WASH", preco: 149.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Sabonete1 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_sabonete1.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>KORRES</Text>
          <Text style={estilos.subtituloProduto}>
            SABONETE LÍQUIDO KORRES ÓLEO DE OLIVA E BERGAMOTA
          </Text>
          <Text style={estilos.descricaoProduto}>
          Enriquecido com azeite de oliva puro e com deliciosa fragrância cítrica e frutada da Bergamota. Forma uma espuma cremosa que limpa gentilmente mantendo os níveis naturais de hidratação da pele. Ideal para uso diário.
          Fórmula com 91,9% Conteúdo Natural + Derivados Naturais.
          </Text>
          <Text style={estilos.precoProduto}>R$ 149,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "SABONETE LÍQUIDO KORRES ÓLEO DE OLIVA E BERGAMOTA", preco: 149.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Maquiagem3 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_maquiagem3.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>LAURA MERCIER</Text>
          <Text style={estilos.subtituloProduto}>
            MINI PÓ SOLTO LAURA MERCIER TRANSLUCENT LOOSE SETTING POWDER
          </Text>
          <Text style={estilos.descricaoProduto}>
          Transluscent Loose Setting Powder: pó essencial para selar a maquiagem, controlando a oleosidade e deixando um efeito de seda mate suave, dissimulando as linhas finas e imperfeições e sem adicionar cor à maquiagem aplicada anteriormente.
          Os profissionais adoram a aplicação suave que ocorre de maneira uniforme e sela a maquiagem por até 16 horas sem pesar ou adicionar textura e com controle de oleosidade por 24 horas.
          </Text>
          <Text style={estilos.precoProduto}>R$ 149,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "MINI PÓ SOLTO LAURA MERCIER TRANSLUCENT LOOSE SETTING POWDER", preco: 149.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Maquiagem2 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_maquiagem2.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>TOO FACED</Text>
          <Text style={estilos.subtituloProduto}>
            CORRETIVO TOO FACED BORN THIS WAY SUPER COVERAGE MULTI-USE SCULPTING
          </Text>
          <Text style={estilos.descricaoProduto}>
          Contorne, ilumine e esconda imperfeições com o novo corretivo de construção de camadas 4 em 1 de Too faced: Multi-uso de alta cobertura e hidratante, para garantir um look natural com pele macia.
          </Text>
          <Text style={estilos.precoProduto}>R$ 237,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "CORRETIVO TOO FACED BORN THIS WAY SUPER COVERAGE MULTI-USE SCULPTING", preco: 237.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Maquiagem1 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_maquiagem1.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>RARE BEAUTY</Text>
          <Text style={estilos.subtituloProduto}>
            BLUSH LÍQUIDO RARE BEAUTY SOFT PINCH LIQUID BLUSH
          </Text>
          <Text style={estilos.descricaoProduto}>
          Um blush líquido leve e de longa duração que se espalha e cria lindas camadas para um rubor suave e saudável.
          Crie um rubor perfeito usando esta fórmula superleve e com pigmentos de longa duração que duram o dia todo.
          Disponível em acabamentos matte e cintilante, este blush líquido se espalha em lindas camadas criando uma cor suave com acabamento natural.
          </Text>
          <Text style={estilos.precoProduto}>R$ 169,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "BLUSH LÍQUIDO RARE BEAUTY SOFT PINCH LIQUID BLUSH", preco: 169.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Creme3 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_creme3.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>RARE BEAUTY</Text>
          <Text style={estilos.subtituloProduto}>
            CREME CORPORAL RARE BEAUTY FIND COMFORT HYDRATING
          </Text>
          <Text style={estilos.descricaoProduto}>
          Com fragrância revigorante, o creme corporal Rare Beauty proporciona hidratação, iluminando instantaneamente a pele e renovando sua vitalidade. Enriquecido com niacinamida, extrato de flor de pêssego e ashwagandha, acalma, firma e revitaliza, conferindo um brilho saudável.
Uma fórmula de rápida absorção que traz várias sensações de frescor — e nenhuma sensação de oleosidade. Temos orgulho de usar embalagens feitas com 97% de plástico reciclado pós-consumo (PCR).
          </Text>
          <Text style={estilos.precoProduto}>R$ 229,90</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "CREME CORPORAL RARE BEAUTY FIND COMFORT HYDRATING", preco: 229.90 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Creme2 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_creme2.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>SHISEIDO</Text>
          <Text style={estilos.subtituloProduto}>
            CREME FACIAL DE FIRMEZA E EFEITO LIFTING SHISEIDO VITAL PERFECTION
          </Text>
          <Text style={estilos.descricaoProduto}>
          Descubra a revolução em cuidados com a pele com o Creme Facial de Firmeza e Efeito Lifting Shiseido Vital Perfection.
Este produto foi formulado meticulosamente para proporcionar uma experiência de skincare de alta qualidade, elevando a firmeza e promovendo um efeito lifting notável.
Ao incorporar a mais avançada tecnologia da Shiseido, este creme se destaca como um aliado essencial na busca por uma pele visivelmente mais jovem e firme.
          </Text>
          <Text style={estilos.precoProduto}>R$ 409,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "CREME FACIAL DE FIRMEZA E EFEITO LIFTING SHISEIDO VITAL PERFECTION", preco: 409.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Creme1 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_creme1.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>CLINIQUE</Text>
          <Text style={estilos.subtituloProduto}>
            HIDRATANTE GEL-CREME CLINIQUE MOISTURE SURGE
          </Text>
          <Text style={estilos.descricaoProduto}>
          O hidratante Clinique Moisture Surge perfeito para quem quer potencializar a hidratação da pele de forma leve, refrescante e eficiente. 
Nesta nova formulação – agora sem óleo – este creme hidratante tem a capacidade de penetrar a além de dez camadas de profundidade da pele, recuperando o viço e combatendo o ressecamento.
Sua fórmula, que conta com ingredientes poderosos, é capaz de devolver o brilho, iluminar, energizar e uniformizar a pele, deixando-a com uma aparência saudável e radiante.
          </Text>
          <Text style={estilos.precoProduto}>R$ 159,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "HIDRATANTE GEL-CREME CLINIQUE MOISTURE SURGE", preco: 159.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Perfume3 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_perfume3.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>CAROLINA HERRERA</Text>
          <Text style={estilos.subtituloProduto}>
            PERFUME CAROLINA HERRERA GOOD GIRL FEMININO EAU DE PARFUM
          </Text>
          <Text style={estilos.descricaoProduto}>
          O perfume feminino importado Good Girl Eau de Parfum é uma fragrância ousada e altamente sofisticada, inspirada na visão única de Carolina Herrera sobre a dualidade da mulher moderna: ao mesmo tempo poderosa e divertida, elegante e sexy, gentil e misteriosa.
          </Text>
          <Text style={estilos.precoProduto}>R$ 229,90</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "PERFUME CAROLINA HERRERA GOOD GIRL FEMININO EAU DE PARFUM", preco: 229.90 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Perfume2 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_perfume2.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>ESTÉE LAUDER</Text>
          <Text style={estilos.subtituloProduto}>
            ÓLEO DE BANHO ESTÉE LAUDER YOUTH DEW
          </Text>
          <Text style={estilos.descricaoProduto}>
          Absolutamente cativante, com flores opulentas, especiarias ricas, madeiras preciosas.
          Foi considerada uma das fragrâncias mais sexy já criadas e, mais de 50 anos depois de lançada, continua a seduzir com seu apelo sensual, mas atemporal.
          Este óleo de banho é a fórmula notável que começou tudo. Despeje algumas gotas durante um prazeroso banho relaxante ou simplesmente use-o como uma fragrância.
          </Text>
          <Text style={estilos.precoProduto}>R$ 300,00</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "ÓLEO DE BANHO ESTÉE LAUDER YOUTH DEW", preco: 300.00 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Perfume1 extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Image
          style={estilos.imagem_produtos_grande}
          source={require("./assets/foto_perfume1.png")}
          resizeMode="contain"
        />
        <View style={estilos.detalhesProduto}>
          <Text style={estilos.tituloProduto}>YVES SAINT LAURENT</Text>
          <Text style={estilos.subtituloProduto}>
            PERFUME YVES SAINT LAURENT LIBRE FEMININO EAU DE PARFUM
          </Text>
          <Text style={estilos.descricaoProduto}>
            Descubra a essência da liberdade com Yves Saint Laurent Libre, um
            perfume feminino ousado e elegante. Com uma mistura sofisticada de
            lavanda francesa, flor de laranjeira marroquina e uma nota sensual
            de almíscar, este perfume é ideal para mulheres modernas e
            autoconfiantes.
          </Text>
          <Text style={estilos.precoProduto}>R$ 269,90</Text>
          <TouchableOpacity style={estilos.botaoComprar}>
            <Text style={estilos.textoBotaoComprar}
            onPress={() => this.props.adicionarProduto({ nome: "PERFUME YVES SAINT LAURENT LIBRE FEMININO EAU DE PARFUM", preco: 269.90 })}
            >Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

class Desodorantes extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
      <LinearGradient
          style={estilos.container}
          colors={["#91A6FF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#91A6FF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
        <Image
          style={estilos.imagem_produtos}
          source={require("./assets/foto_desodorante1.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Banderas Black')}>
            <Text>BANDERAS BLACK</Text>
        </TouchableOpacity>
        <Image
          style={estilos.imagem_produtos}
          source={require("./assets/foto_desodorante2.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Banderas Seduction')}>
            <Text>BANDERAS SEDUCTION</Text>
        </TouchableOpacity>
        <Image
          style={estilos.imagem_produtos}
          source={require("./assets/foto_desodorante3.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('212 VIP MEN')}>
            <Text>212 VIP MEN</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
    );
  }
}

class Sabonetes extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
      <LinearGradient
          style={estilos.container}
          colors={["#91A6FF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#91A6FF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
        <Image
          style={estilos.imagem_sabonetes}
          source={require("./assets/foto_sabonete1.png")} />
          <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Korres')}>
            <Text>KORRES</Text>
        </TouchableOpacity>
        <Image
          style={estilos.imagem_sabonetes}
          source={require("./assets/foto_sabonete2.png")} />
          <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Sol de Janeiro')}>
            <Text>SOL DE JANEIRO</Text>
        </TouchableOpacity>
        <Image
          style={estilos.imagem_sabonetes}
          source={require("./assets/foto_sabonete3.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Feito Brasil')}>
            <Text>FEITO BRASIL</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
    );
  }
}

class Maquiagens extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
      <LinearGradient
          style={estilos.container}
          colors={["#91A6FF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#91A6FF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
        <Image
          style={estilos.imagem_maquiagem}
          source={require("./assets/foto_maquiagem1.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Rare Beauty Blush')}>
            <Text>RARE BEAUTY</Text>
        </TouchableOpacity> 
        <Image
          style={estilos.imagem_maquiagem}
          source={require("./assets/foto_maquiagem2.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Too Faced')}>
            <Text>TOO FACED</Text>
        </TouchableOpacity> 
        <Image
          style={estilos.imagem_maquiagem}
          source={require("./assets/foto_maquiagem3.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Laura Mercier')}>
            <Text>LAURA MERCIER</Text>
        </TouchableOpacity> 
      </LinearGradient>
      </View>
    );
  }
}

class Cremes extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
      <LinearGradient
          style={estilos.container}
          colors={["#91A6FF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#91A6FF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
        <Image
          style={estilos.imagem_cremes}
          source={require("./assets/foto_creme1.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Clinique')}>
            <Text>CLINIQUE</Text>
          </TouchableOpacity>  
        <Image
          style={estilos.imagem_cremes}
          source={require("./assets/foto_creme2.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Shiseido')}>
            <Text>SHISEIDO</Text>
        </TouchableOpacity>
        <Image
          style={estilos.imagem_cremes}
          source={require("./assets/foto_creme3.png")} />
        <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Rare Beauty')}>
            <Text>RARE BEAUTY</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
    );
  }
}

class Perfumes extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
        <LinearGradient
          style={estilos.container}
          colors={["#91A6FF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#91A6FF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
          <Image
            style={estilos.imagem_produtos}
            source={require("./assets/foto_perfume1.png")} />
          <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Yves Saint Laurent')}>
            <Text>YVES SAINT LAURENT</Text>
          </TouchableOpacity>
          <Image
            style={estilos.imagem_produtos}
            source={require("./assets/foto_perfume2.png")} />
          <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Estée Lauder')}>
            <Text>ESTÉE LAUDER</Text>
          </TouchableOpacity>
          <Image
            style={estilos.imagem_produtos}
            source={require("./assets/foto_perfume3.png")} />
          <TouchableOpacity style={estilos.botoes_legenda} onPress={() => this.props.navigation.navigate('Carolina Herrera')}>
            <Text>CAROLINA HERRERA</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

class Catalogo extends React.Component {
  render() {
    return (
      <View style={estilos.container_catalogo}>
        <LinearGradient
          style={estilos.container}
          colors={["#84d2ff", "#e52e71", "#e52e71", "#e52e71", "#84d2ff"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}>
          <Text style={estilos.texto_titulo}>Seja bem vindo(a) a AVICENNA</Text>
          <TouchableOpacity style={estilos.botoes_catalogo} onPress={() => this.props.navigation.navigate('Perfumes')}>
            <Text>Perfumes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botoes_catalogo} onPress={() => this.props.navigation.navigate('Cremes')}>
            <Text>Cremes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botoes_catalogo} onPress={() => this.props.navigation.navigate('Maquiagens')}>
            <Text>Maquiagens</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botoes_catalogo} onPress={() => this.props.navigation.navigate('Sabonetes')}>
            <Text>Sabonetes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botoes_catalogo} onPress={() => this.props.navigation.navigate('Desodorantes')}>
            <Text>Desodorantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botao_sacola} onPress={() => this.props.navigation.navigate('Sacola')}>
            <Text>Sacola</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Nav2}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home-account" color={color} size={size} />),
              headerShown: false
            }}
          />
          <Tab.Screen name="Criar Usuário" component={Cadastro}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-details" color={color} size={size} />)
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const estilos = StyleSheet.create({
  texto: {
    color: 'black',
    fontSize: 17,
    alignItems: 'center',
    marginBottom: 10,
    fontWeight: "bold"
  },
  caixa: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#ecf0f1',
    borderWidth: 2,
    fontSize: 12,
    width: "75%",
    marginBottom: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    width: "100%",
    height: "100%",
  },
  
  container_catalogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  botoes_catalogo: {
    alignItems: 'center',
    backgroundColor: '#7fd2e2',
    width: '250px',
    padding: 10,
    marginBottom: 30,
    borderRadius: 50
  },
  botao_sacola: {
    alignItems: 'center',
    backgroundColor: 'lightyellow',
    width: '250px',
    padding: 10,
    marginBottom: 30,
    borderRadius: 50
  },  
  texto_titulo: {
    color: 'black',
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: 'Arial Black',
    textAlign: 'center',
    marginBottom: 35
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 30
  },
  imagem_produtos: {
    width: 70,
    height: 110,
    marginBottom: 10
  },
  imagem_maquiagem: {
    width: 110,
    height: 110,
    marginBottom: 10
  },
  imagem_cremes: {
    width: 110,
    height: 110,
    marginBottom: 10
  },
  imagem_sabonetes: {
    width: 80,
    height: 110,
    marginBottom: 10
  },
  botoes_legenda: {
    alignItems: 'center',
    backgroundColor: '#7fd2e2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
    width: 250
  },
  imagem_produtos_grande: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  detalhesProduto: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  tituloProduto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtituloProduto: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  descricaoProduto: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
    textAlign: 'center',
  },
  precoProduto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e52e71',
    marginBottom: 20,
  },
  botaoComprar: {
    backgroundColor: '#e52e71',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  textoBotaoComprar: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  itemSacola: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoRemover: {
    ontSize: 14,
    color: '#FF0000',
    textDecorationLine: 'underline',
  },
  textoSacola: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoTotal: {

  },
});

export default App;