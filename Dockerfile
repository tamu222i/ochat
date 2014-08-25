FROM centos:centos7
MAINTAINER hitaka0214 <hitaka0214@gmail.com>

# install for needs
#RUN yum -y update
RUN yum install -y tar git

# install meteor
RUN curl install.meteor.com | /bin/sh

# clone from github
RUN git clone https://github.com/hitaka0214/ochat.git /tmp/ochat
WORKDIR /tmp/ochat
RUN git checkout dev

# port forwarding
EXPOSE 3000

# meteor on!
WORKDIR /tmp/ochat
CMD /usr/local/bin/meteor

# EOF
