import { Box } from "@mui/material";
import "./about.scss";

const About = () => {
    return (
        <Box className="about">
            <Box
                component="section"
                className="about__section">
                <h3>Misión</h3>
                <img
                    src="images/mision.png"
                    alt="foto misión empresa"
                />
                <p>Nuestra misión es ofrecer a nuestros clientes una amplia gama de calzado de calidad, diseñado para satisfacer sus necesidades y preferencias individuales. Nos esforzamos por proporcionar un servicio excepcional, una experiencia de compra agradable y un ambiente acogedor en nuestras tiendas. Buscamos inspirar confianza en nuestros productos y en nuestra marca, promoviendo un estilo de vida activo y elegante a través de nuestra selección de calzado moderno y a la moda.</p>
            </Box>
            <Box
                component="section"
                className="about__section">
                <h3>Visión</h3>
                <img
                    src="images/vison.png"
                    alt="foto visión empresa"
                />
                <p>Aspiramos a ser líderes en la industria, reconocidos por nuestra innovación, calidad excepcional y compromiso inquebrantable con la satisfacción del cliente. Nos esforzamos por transformar continuamente el mercado, ofreciendo soluciones revolucionarias que superen las expectativas de nuestros clientes y redefinan los estándares de excelencia.</p>
            </Box>
            <Box
                component="section"
                className="about__section">
                <h3>Valores</h3>
                <img
                    src="images/valores.png"
                    alt="foto valores empresa"
                />
                <p>En nuestra empresa de calzado, nos guiamos por una serie de valores fundamentales que reflejan nuestra dedicación hacia nuestros clientes, empleados y comunidad. La integridad es la base de nuestras operaciones, seguida de un compromiso inquebrantable con la calidad en cada par de zapatos que fabricamos. Valoramos la innovación, buscando constantemente nuevas formas de diseñar y producir calzado que se adapte a las necesidades cambiantes de nuestros clientes. Fomentamos la colaboración y el respeto entre nuestro equipo, reconociendo que juntos logramos más.</p>
            </Box>
        </Box>
    );
};

export default About;