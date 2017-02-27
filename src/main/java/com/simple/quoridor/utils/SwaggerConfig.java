package com.simple.quoridor.utils;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.bind.annotation.RequestMethod;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        List<ResponseMessage> globalResponseMessages = Lists.newArrayList();
        globalResponseMessages.add(new ResponseMessageBuilder()
                .code(500)
                .message("INTERNAL SERVER ERROR")
                .build());

        List<Parameter> globalParameters = Lists.newArrayList();
        globalParameters.add(new ParameterBuilder()
                .name("version")
                .description("API version info")
                .modelRef(new ModelRef("string"))
                .parameterType("path")
                .required(true)
                .build());

        // TODO : hyelim-jung : global response content type 설정하기.

        return new Docket(DocumentationType.SWAGGER_2)
                .globalOperationParameters(globalParameters)
                .globalResponseMessage(RequestMethod.GET, globalResponseMessages)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.simple.quoridor.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());

    }

    @SuppressWarnings("deprecation")
    private ApiInfo apiInfo() {
        ApiInfo apiInfo = new ApiInfo(
                "REST API",
                "Simple Quoridor API",
                "API V1.0",
                "Terms of service",
                "jhl3646@naver.com",
                "License of API",
                "API license URL");
        return apiInfo;
    }
}
