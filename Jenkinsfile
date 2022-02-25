@Library('ceiba-jenkins-library') _
pipeline {
  agent {
    label 'Slave_Induccion'
  }

  tools {
    jdk 'JDK8_Centos'
  }

  stages{

    stage('Checkout'){
      steps {
        echo "------------>Checkout<------------"
        checkout scm
      }
    }

    stage('Install') {
      steps {
        echo "------------>Install<------------"
        sh 'npm install'
      }
    }

    stage('Build') {
        steps {
          echo "------------>Build<------------"
          sh 'npm run build'
        }
    }

    stage('esLint') {
      steps {
        echo "------------>Lint<------------"
        sh 'npm run lint'
      }
    }

    stage('Test') {
        steps {
          echo "------------>Testing<------------"
          sh 'npm run test -- --watch=false --browsers ChromeHeadless'
        }
    }

    // stage('Test end-to-end') {
    //   steps{
    //     echo "------------>Testing Protractor<------------"
    //     sh 'npm run e2e'
    //   }
    // }

    stage('Static Code Analysis') {
      steps{
        echo '------------>Análisis de código estático<------------'
        sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn:natalia.guarderiamascotas.front-natalia.barbosa',
                                    sonarName:'CeibaADN-GuarderiaMascotas-Front-natalia.barbosa',
                                    sonarPathProperties:'./sonar-project.properties')
        }
    }


  }

  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
      mail (to: 'natalia.barbosa@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
