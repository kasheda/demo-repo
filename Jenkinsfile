pipeline {
    agent any

    stages {
        stage('Repo Info') {
            steps {
                echo 'Pipeline pulled from SCM'
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Validate Files') {
            steps {
                sh 'test -f Jenkinsfile'
                sh 'test -f README.md'
                sh 'echo Required files exist'
            }
        }

        stage('Show README') {
            steps {
                sh 'cat README.md'
            }
        }
    }
}
