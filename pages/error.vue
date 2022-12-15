<template>
    <main class="auto">  
        <h2>ERROR EN SU COMPRA, INTENTE DE NUEVO</h2>
    </main> 
</template>
<style scoped lang="scss">  
      /* autos flota id */ 
    .auto {  
        article {
            background-color: white;
            border-radius: 5px; 
            padding: 5px;
            display: flex;
            flex-direction: column;
            min-width: 350px; 
            margin:5px; 
        }
        h2 {
            font-weight: bold;
            font-size: 32px; 
            margin-top: 20px;
            margin: 10px;
            width: 100%; 
        }
        header { 
            display: flex;
            text-align: center;
            margin-bottom: 10px;
            align-items: center;
        }
        h3 {
            font-weight: bold;
            font-size: 34px;  
            width: 100%; 
        } 
        em {
            font-size: 24px;
            color: gray;
            font-style: italic; 
        }
        p {  
            font-size: 15px; 
            padding: 3px; 
        }  
        img {
            object-fit:contain;
            width: 100%;
            height: 160px;
            padding: 5px;
            border-radius: 5px;
        } 
        footer {
            text-align: center;
            justify-content: space-between; 
            display: flex;
            width: 100%;
            h4 {
            font-size: 40px;
            font-weight:bold;
            } 
            em {
            font-size: 24px;
            color: rgb(3, 3, 3);
            font-style:normal;
            } 
            button {
                background-color: #047EFF;
                padding: 5px 15px;
                border-radius: 5px; 
                text-transform: uppercase;
                font-size: 16px;
                font-weight: 600;
                color: white;    
                text-align: center;
            } 
        }
        .specs {
            display: none;    
            padding: 5px; 
            div {
                text-align: center; 
                text-transform:capitalize;
                width: 50px; 
            }
            dl {
                display: flex;
                font-size: 12px;
                font-weight: bold;
            }
            dd {  
                font-size: 12px; 
            } 
            dt {
                object-fit:contain;
            } 
            img{ 
                max-width:  15px;  
            } 
        }
        .detalles-conductor{
            background-color:white;
            border-radius: 5px; 
            padding: 5px; 
            min-width: 350px; 
            margin:5px;
            line-height: 1.5;
                form {
                    margin-bottom: 10px; 
                p { 
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between; 
                } 
            }
        }
    }   
    // Desktop  
    @media screen and (min-width: 768px) { 
        .auto {
            display: flex;
            .detalles-conductor{
                background-color: white;
                border-radius: 5px; 
                padding: 5px; 
                width: 100%; 
                margin:5px;
                line-height: 1.5;
                
                form {
                    input {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 3px;
                        margin-left: 20px;
                        width: 100%;
                        box-sizing: border-box;
                        background-color: rgb(245, 245, 245);
                    }
                    margin-bottom: 10px; 
                    p { 
                        font-size: 18px;
                        max-width: 500px;
                        display: flex; 
                        flex-direction: column;
                        justify-content: space-between; 
                    } 
                }
            }
            
            article {
                background-color: white;
                border-radius: 5px; 
                padding: 5px;
                display: flex;
                flex-direction: column;
                min-width: 400px; 
                margin:10px; 
                // justify-content: space-around;
            }
            header { 
                display: flex;
                flex-direction: column;  
            } 
            img {
                object-fit:contain;
                width: 100%;
                height: 400px;
                padding: 5px;
                border-radius: 5px; 
            } //650 x 411
            .specs { 
                display:flex;
                flex-wrap: wrap; 
                div {
                    text-align: center; 
                    text-transform:capitalize;
                    width: 90px; 
                    margin-top: 3px;
                }
                dl {
                    display: flex;
                    font-size: 14px;
                    font-weight: bold;
                }
                dd {  
                    font-size: 12px; 
                } 
                dt {
                    object-fit:contain;
                } 
                img{ 
                    max-width: 25px;
                    max-height: 25px;
                    object-fit:contain; 
                    padding: 2px;  
                }  
            }
        } 
    }
</style> 