PGDMP                      }         
   FindWorker    17.0    17.0 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    278735 
   FindWorker    DATABASE     �   CREATE DATABASE "FindWorker" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "FindWorker";
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1259    278834    admins    TABLE     R  CREATE TABLE public.admins (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'ADMIN'::character varying,
    "jwtVersion" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.admins;
       public         heap r       postgres    false    4            �            1259    278833    admins_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.admins_id_seq;
       public               postgres    false    246    4            �           0    0    admins_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
          public               postgres    false    245            �            1259    278737 
   applicants    TABLE       CREATE TABLE public.applicants (
    id integer NOT NULL,
    "lastName" character varying(255) NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "middleName" character varying(255),
    "phoneNumber" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying,
    "jwtVersion" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.applicants;
       public         heap r       postgres    false    4            �            1259    278736    applicants_id_seq    SEQUENCE     �   CREATE SEQUENCE public.applicants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.applicants_id_seq;
       public               postgres    false    4    230            �           0    0    applicants_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.applicants_id_seq OWNED BY public.applicants.id;
          public               postgres    false    229            �            1259    278762 
   busynesses    TABLE     �   CREATE TABLE public.busynesses (
    id integer NOT NULL,
    "nameBusyness" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.busynesses;
       public         heap r       postgres    false    4            �            1259    278761    busynesses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.busynesses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.busynesses_id_seq;
       public               postgres    false    234    4            �           0    0    busynesses_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.busynesses_id_seq OWNED BY public.busynesses.id;
          public               postgres    false    233            �            1259    278769 
   currencies    TABLE     �   CREATE TABLE public.currencies (
    id integer NOT NULL,
    currency character varying(50),
    symbol character varying(1),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.currencies;
       public         heap r       postgres    false    4            �            1259    278768    currencies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.currencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.currencies_id_seq;
       public               postgres    false    236    4            �           0    0    currencies_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.currencies_id_seq OWNED BY public.currencies.id;
          public               postgres    false    235            �            1259    278749 	   employees    TABLE     �  CREATE TABLE public.employees (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    email text NOT NULL,
    "phoneNumber" character varying(50) NOT NULL,
    password text NOT NULL,
    role character varying(255) DEFAULT 'EMPLOYEE'::character varying NOT NULL,
    address text NOT NULL,
    img text DEFAULT 'defaultLogoEmployer.png'::text,
    "jwtVersion" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.employees;
       public         heap r       postgres    false    4            �            1259    278748    employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.employees_id_seq;
       public               postgres    false    4    232            �           0    0    employees_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;
          public               postgres    false    231            �            1259    278776 	   feedbacks    TABLE     1  CREATE TABLE public.feedbacks (
    id integer NOT NULL,
    "idEmployee" integer NOT NULL,
    name text NOT NULL,
    "idApplicant" integer NOT NULL,
    description text,
    rate integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.feedbacks;
       public         heap r       postgres    false    4            �            1259    278775    feedbacks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.feedbacks_id_seq;
       public               postgres    false    4    238            �           0    0    feedbacks_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;
          public               postgres    false    237            �            1259    278795    notifications_applicants    TABLE       CREATE TABLE public.notifications_applicants (
    id integer NOT NULL,
    "idApplicant" integer NOT NULL,
    body text,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 ,   DROP TABLE public.notifications_applicants;
       public         heap r       postgres    false    4            �            1259    278794    notifications_applicants_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notifications_applicants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.notifications_applicants_id_seq;
       public               postgres    false    240    4            �           0    0    notifications_applicants_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.notifications_applicants_id_seq OWNED BY public.notifications_applicants.id;
          public               postgres    false    239            �            1259    278810    notifications_employees    TABLE       CREATE TABLE public.notifications_employees (
    id integer NOT NULL,
    "idEmployee" integer NOT NULL,
    body text,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 +   DROP TABLE public.notifications_employees;
       public         heap r       postgres    false    4            �            1259    278809    notifications_employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notifications_employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.notifications_employees_id_seq;
       public               postgres    false    4    242            �           0    0    notifications_employees_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.notifications_employees_id_seq OWNED BY public.notifications_employees.id;
          public               postgres    false    241            �            1259    278825 	   positions    TABLE     �   CREATE TABLE public.positions (
    id integer NOT NULL,
    name character varying(50),
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.positions;
       public         heap r       postgres    false    4            �            1259    278824    positions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.positions_id_seq;
       public               postgres    false    244    4            �           0    0    positions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;
          public               postgres    false    243            �            1259    278902    recall_vacancies    TABLE     V  CREATE TABLE public.recall_vacancies (
    id integer NOT NULL,
    status character varying(50) DEFAULT 'PENDING'::character varying NOT NULL,
    "idApplicant" integer NOT NULL,
    "idVacancy" integer NOT NULL,
    "idResume" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 $   DROP TABLE public.recall_vacancies;
       public         heap r       postgres    false    4            �            1259    278901    recall_vacancies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recall_vacancies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.recall_vacancies_id_seq;
       public               postgres    false    4    254            �           0    0    recall_vacancies_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.recall_vacancies_id_seq OWNED BY public.recall_vacancies.id;
          public               postgres    false    253                        1259    278922    resumes    TABLE     ?  CREATE TABLE public.resumes (
    id integer NOT NULL,
    "idApplicant" integer NOT NULL,
    "idPosition" integer NOT NULL,
    education text,
    skills text,
    experience text,
    city text,
    links text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.resumes;
       public         heap r       postgres    false    4            �            1259    278921    resumes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resumes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.resumes_id_seq;
       public               postgres    false    4    256            �           0    0    resumes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.resumes_id_seq OWNED BY public.resumes.id;
          public               postgres    false    255            �            1259    278862 	   vacancies    TABLE     ~  CREATE TABLE public.vacancies (
    id integer NOT NULL,
    "idEmployee" integer NOT NULL,
    "idBusyness" integer,
    "idCurrency" integer,
    "idWorkExperience" integer,
    "idWorkFormat" integer,
    "idPosition" integer NOT NULL,
    name text,
    description text,
    "officeHours" double precision,
    "workSchedule" character varying(50),
    "Address" text,
    "needResume" boolean,
    "minimumPayment" numeric,
    "maximumPayment" numeric,
    status character varying(50) DEFAULT 'MODERATION'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.vacancies;
       public         heap r       postgres    false    4            �            1259    278861    vacancies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vacancies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.vacancies_id_seq;
       public               postgres    false    4    252            �           0    0    vacancies_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.vacancies_id_seq OWNED BY public.vacancies.id;
          public               postgres    false    251            �            1259    278846    work_experiences    TABLE     �   CREATE TABLE public.work_experiences (
    id integer NOT NULL,
    name character varying(50),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 $   DROP TABLE public.work_experiences;
       public         heap r       postgres    false    4            �            1259    278845    work_experiences_id_seq    SEQUENCE     �   CREATE SEQUENCE public.work_experiences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.work_experiences_id_seq;
       public               postgres    false    4    248            �           0    0    work_experiences_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.work_experiences_id_seq OWNED BY public.work_experiences.id;
          public               postgres    false    247            �            1259    278853    work_formats    TABLE     �   CREATE TABLE public.work_formats (
    id integer NOT NULL,
    name text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public.work_formats;
       public         heap r       postgres    false    4            �            1259    278852    work_formats_id_seq    SEQUENCE     �   CREATE SEQUENCE public.work_formats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.work_formats_id_seq;
       public               postgres    false    4    250            �           0    0    work_formats_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.work_formats_id_seq OWNED BY public.work_formats.id;
          public               postgres    false    249            {           2604    278837 	   admins id    DEFAULT     f   ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
 8   ALTER TABLE public.admins ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    246    245    246            n           2604    278740    applicants id    DEFAULT     n   ALTER TABLE ONLY public.applicants ALTER COLUMN id SET DEFAULT nextval('public.applicants_id_seq'::regclass);
 <   ALTER TABLE public.applicants ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    229    230    230            s           2604    278765    busynesses id    DEFAULT     n   ALTER TABLE ONLY public.busynesses ALTER COLUMN id SET DEFAULT nextval('public.busynesses_id_seq'::regclass);
 <   ALTER TABLE public.busynesses ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    234    233    234            t           2604    278772    currencies id    DEFAULT     n   ALTER TABLE ONLY public.currencies ALTER COLUMN id SET DEFAULT nextval('public.currencies_id_seq'::regclass);
 <   ALTER TABLE public.currencies ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    236    235    236            p           2604    278752    employees id    DEFAULT     l   ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);
 ;   ALTER TABLE public.employees ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    231    232    232            u           2604    278779    feedbacks id    DEFAULT     l   ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);
 ;   ALTER TABLE public.feedbacks ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    238    237    238            v           2604    278798    notifications_applicants id    DEFAULT     �   ALTER TABLE ONLY public.notifications_applicants ALTER COLUMN id SET DEFAULT nextval('public.notifications_applicants_id_seq'::regclass);
 J   ALTER TABLE public.notifications_applicants ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    240    239    240            x           2604    278813    notifications_employees id    DEFAULT     �   ALTER TABLE ONLY public.notifications_employees ALTER COLUMN id SET DEFAULT nextval('public.notifications_employees_id_seq'::regclass);
 I   ALTER TABLE public.notifications_employees ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    242    241    242            z           2604    278828    positions id    DEFAULT     l   ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);
 ;   ALTER TABLE public.positions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    243    244    244            �           2604    278905    recall_vacancies id    DEFAULT     z   ALTER TABLE ONLY public.recall_vacancies ALTER COLUMN id SET DEFAULT nextval('public.recall_vacancies_id_seq'::regclass);
 B   ALTER TABLE public.recall_vacancies ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    254    253    254            �           2604    278925 
   resumes id    DEFAULT     h   ALTER TABLE ONLY public.resumes ALTER COLUMN id SET DEFAULT nextval('public.resumes_id_seq'::regclass);
 9   ALTER TABLE public.resumes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    256    255    256                       2604    278865    vacancies id    DEFAULT     l   ALTER TABLE ONLY public.vacancies ALTER COLUMN id SET DEFAULT nextval('public.vacancies_id_seq'::regclass);
 ;   ALTER TABLE public.vacancies ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    252    251    252            }           2604    278849    work_experiences id    DEFAULT     z   ALTER TABLE ONLY public.work_experiences ALTER COLUMN id SET DEFAULT nextval('public.work_experiences_id_seq'::regclass);
 B   ALTER TABLE public.work_experiences ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    247    248    248            ~           2604    278856    work_formats id    DEFAULT     r   ALTER TABLE ONLY public.work_formats ALTER COLUMN id SET DEFAULT nextval('public.work_formats_id_seq'::regclass);
 >   ALTER TABLE public.work_formats ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    250    249    250            �          0    278834    admins 
   TABLE DATA           c   COPY public.admins (id, login, password, role, "jwtVersion", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    246   j�       �          0    278737 
   applicants 
   TABLE DATA           �   COPY public.applicants (id, "lastName", "firstName", "middleName", "phoneNumber", email, password, role, "jwtVersion", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    230   �       �          0    278762 
   busynesses 
   TABLE DATA           R   COPY public.busynesses (id, "nameBusyness", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    234   �       �          0    278769 
   currencies 
   TABLE DATA           T   COPY public.currencies (id, currency, symbol, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    236   ��       �          0    278749 	   employees 
   TABLE DATA           �   COPY public.employees (id, name, description, email, "phoneNumber", password, role, address, img, "jwtVersion", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    232   ��       �          0    278776 	   feedbacks 
   TABLE DATA           w   COPY public.feedbacks (id, "idEmployee", name, "idApplicant", description, rate, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    238   W�       �          0    278795    notifications_applicants 
   TABLE DATA           o   COPY public.notifications_applicants (id, "idApplicant", body, "isRead", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    240   L�       �          0    278810    notifications_employees 
   TABLE DATA           m   COPY public.notifications_employees (id, "idEmployee", body, "isRead", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    242   ��       �          0    278825 	   positions 
   TABLE DATA           T   COPY public.positions (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    244   ��       �          0    278902    recall_vacancies 
   TABLE DATA           x   COPY public.recall_vacancies (id, status, "idApplicant", "idVacancy", "idResume", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    254   e�       �          0    278922    resumes 
   TABLE DATA           �   COPY public.resumes (id, "idApplicant", "idPosition", education, skills, experience, city, links, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    256    �       �          0    278862 	   vacancies 
   TABLE DATA             COPY public.vacancies (id, "idEmployee", "idBusyness", "idCurrency", "idWorkExperience", "idWorkFormat", "idPosition", name, description, "officeHours", "workSchedule", "Address", "needResume", "minimumPayment", "maximumPayment", status, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    252    �       �          0    278846    work_experiences 
   TABLE DATA           N   COPY public.work_experiences (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    248   ��       �          0    278853    work_formats 
   TABLE DATA           J   COPY public.work_formats (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    250   B�       �           0    0    admins_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.admins_id_seq', 1, true);
          public               postgres    false    245            �           0    0    applicants_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.applicants_id_seq', 1, true);
          public               postgres    false    229            �           0    0    busynesses_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.busynesses_id_seq', 5, true);
          public               postgres    false    233            �           0    0    currencies_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.currencies_id_seq', 3, true);
          public               postgres    false    235            �           0    0    employees_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.employees_id_seq', 10, true);
          public               postgres    false    231            �           0    0    feedbacks_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedbacks_id_seq', 4, true);
          public               postgres    false    237            �           0    0    notifications_applicants_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.notifications_applicants_id_seq', 2, true);
          public               postgres    false    239            �           0    0    notifications_employees_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.notifications_employees_id_seq', 35, true);
          public               postgres    false    241            �           0    0    positions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.positions_id_seq', 10, true);
          public               postgres    false    243            �           0    0    recall_vacancies_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.recall_vacancies_id_seq', 6, true);
          public               postgres    false    253            �           0    0    resumes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.resumes_id_seq', 2, true);
          public               postgres    false    255            �           0    0    vacancies_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.vacancies_id_seq', 36, true);
          public               postgres    false    251            �           0    0    work_experiences_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.work_experiences_id_seq', 4, true);
          public               postgres    false    247            �           0    0    work_formats_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.work_formats_id_seq', 2, true);
          public               postgres    false    249            �           2606    280197    admins admins_login_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key UNIQUE (login);
 A   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key;
       public                 postgres    false    246            �           2606    280199    admins admins_login_key1 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key1 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key1;
       public                 postgres    false    246            �           2606    280211    admins admins_login_key10 
   CONSTRAINT     U   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key10 UNIQUE (login);
 C   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key10;
       public                 postgres    false    246            �           2606    280201    admins admins_login_key2 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key2 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key2;
       public                 postgres    false    246            �           2606    280203    admins admins_login_key3 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key3 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key3;
       public                 postgres    false    246            �           2606    280205    admins admins_login_key4 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key4 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key4;
       public                 postgres    false    246            �           2606    280195    admins admins_login_key5 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key5 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key5;
       public                 postgres    false    246            �           2606    280207    admins admins_login_key6 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key6 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key6;
       public                 postgres    false    246            �           2606    280193    admins admins_login_key7 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key7 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key7;
       public                 postgres    false    246            �           2606    280191    admins admins_login_key8 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key8 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key8;
       public                 postgres    false    246            �           2606    280209    admins admins_login_key9 
   CONSTRAINT     T   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_login_key9 UNIQUE (login);
 B   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_login_key9;
       public                 postgres    false    246            �           2606    278842    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public                 postgres    false    246            �           2606    280119    applicants applicants_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key;
       public                 postgres    false    230            �           2606    280121     applicants applicants_email_key1 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key1 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key1;
       public                 postgres    false    230            �           2606    280113 !   applicants applicants_email_key10 
   CONSTRAINT     ]   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key10 UNIQUE (email);
 K   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key10;
       public                 postgres    false    230            �           2606    280123     applicants applicants_email_key2 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key2 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key2;
       public                 postgres    false    230            �           2606    280125     applicants applicants_email_key3 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key3 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key3;
       public                 postgres    false    230            �           2606    280127     applicants applicants_email_key4 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key4 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key4;
       public                 postgres    false    230            �           2606    280117     applicants applicants_email_key5 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key5 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key5;
       public                 postgres    false    230            �           2606    280129     applicants applicants_email_key6 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key6 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key6;
       public                 postgres    false    230            �           2606    280131     applicants applicants_email_key7 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key7 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key7;
       public                 postgres    false    230            �           2606    280115     applicants applicants_email_key8 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key8 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key8;
       public                 postgres    false    230            �           2606    280133     applicants applicants_email_key9 
   CONSTRAINT     \   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_email_key9 UNIQUE (email);
 J   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_email_key9;
       public                 postgres    false    230            �           2606    278745    applicants applicants_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.applicants DROP CONSTRAINT applicants_pkey;
       public                 postgres    false    230            �           2606    278767    busynesses busynesses_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.busynesses
    ADD CONSTRAINT busynesses_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.busynesses DROP CONSTRAINT busynesses_pkey;
       public                 postgres    false    234            �           2606    278774    currencies currencies_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.currencies DROP CONSTRAINT currencies_pkey;
       public                 postgres    false    236            �           2606    280143    employees employees_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key;
       public                 postgres    false    232            �           2606    280145    employees employees_email_key1 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key1 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key1;
       public                 postgres    false    232            �           2606    280159    employees employees_email_key10 
   CONSTRAINT     [   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key10 UNIQUE (email);
 I   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key10;
       public                 postgres    false    232            �           2606    280147    employees employees_email_key2 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key2 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key2;
       public                 postgres    false    232            �           2606    280149    employees employees_email_key3 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key3 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key3;
       public                 postgres    false    232            �           2606    280151    employees employees_email_key4 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key4 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key4;
       public                 postgres    false    232            �           2606    280141    employees employees_email_key5 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key5 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key5;
       public                 postgres    false    232            �           2606    280153    employees employees_email_key6 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key6 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key6;
       public                 postgres    false    232            �           2606    280155    employees employees_email_key7 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key7 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key7;
       public                 postgres    false    232            �           2606    280139    employees employees_email_key8 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key8 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key8;
       public                 postgres    false    232            �           2606    280157    employees employees_email_key9 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key9 UNIQUE (email);
 H   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key9;
       public                 postgres    false    232            �           2606    278758    employees employees_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public                 postgres    false    232            �           2606    278783    feedbacks feedbacks_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.feedbacks DROP CONSTRAINT feedbacks_pkey;
       public                 postgres    false    238            �           2606    278803 6   notifications_applicants notifications_applicants_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.notifications_applicants
    ADD CONSTRAINT notifications_applicants_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.notifications_applicants DROP CONSTRAINT notifications_applicants_pkey;
       public                 postgres    false    240            �           2606    278818 4   notifications_employees notifications_employees_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.notifications_employees
    ADD CONSTRAINT notifications_employees_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.notifications_employees DROP CONSTRAINT notifications_employees_pkey;
       public                 postgres    false    242            �           2606    278832    positions positions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_pkey;
       public                 postgres    false    244            �           2606    278910 ;   recall_vacancies recall_vacancies_idApplicant_idVacancy_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.recall_vacancies
    ADD CONSTRAINT "recall_vacancies_idApplicant_idVacancy_key" UNIQUE ("idApplicant", "idVacancy");
 g   ALTER TABLE ONLY public.recall_vacancies DROP CONSTRAINT "recall_vacancies_idApplicant_idVacancy_key";
       public                 postgres    false    254    254            �           2606    278908 &   recall_vacancies recall_vacancies_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.recall_vacancies
    ADD CONSTRAINT recall_vacancies_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.recall_vacancies DROP CONSTRAINT recall_vacancies_pkey;
       public                 postgres    false    254            �           2606    278929    resumes resumes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT resumes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.resumes DROP CONSTRAINT resumes_pkey;
       public                 postgres    false    256            �           2606    278870    vacancies vacancies_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT vacancies_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.vacancies DROP CONSTRAINT vacancies_pkey;
       public                 postgres    false    252            �           2606    278851 &   work_experiences work_experiences_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.work_experiences
    ADD CONSTRAINT work_experiences_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.work_experiences DROP CONSTRAINT work_experiences_pkey;
       public                 postgres    false    248            �           2606    278860    work_formats work_formats_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.work_formats
    ADD CONSTRAINT work_formats_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.work_formats DROP CONSTRAINT work_formats_pkey;
       public                 postgres    false    250            �           2606    280169 $   feedbacks feedbacks_idApplicant_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT "feedbacks_idApplicant_fkey" FOREIGN KEY ("idApplicant") REFERENCES public.applicants(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.feedbacks DROP CONSTRAINT "feedbacks_idApplicant_fkey";
       public               postgres    false    238    230    4763            �           2606    280164 #   feedbacks feedbacks_idEmployee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT "feedbacks_idEmployee_fkey" FOREIGN KEY ("idEmployee") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.feedbacks DROP CONSTRAINT "feedbacks_idEmployee_fkey";
       public               postgres    false    238    232    4787            �           2606    280174 B   notifications_applicants notifications_applicants_idApplicant_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications_applicants
    ADD CONSTRAINT "notifications_applicants_idApplicant_fkey" FOREIGN KEY ("idApplicant") REFERENCES public.applicants(id) ON UPDATE CASCADE ON DELETE CASCADE;
 n   ALTER TABLE ONLY public.notifications_applicants DROP CONSTRAINT "notifications_applicants_idApplicant_fkey";
       public               postgres    false    240    230    4763            �           2606    280181 ?   notifications_employees notifications_employees_idEmployee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications_employees
    ADD CONSTRAINT "notifications_employees_idEmployee_fkey" FOREIGN KEY ("idEmployee") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE CASCADE;
 k   ALTER TABLE ONLY public.notifications_employees DROP CONSTRAINT "notifications_employees_idEmployee_fkey";
       public               postgres    false    4787    232    242            �           2606    280248 2   recall_vacancies recall_vacancies_idApplicant_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recall_vacancies
    ADD CONSTRAINT "recall_vacancies_idApplicant_fkey" FOREIGN KEY ("idApplicant") REFERENCES public.applicants(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.recall_vacancies DROP CONSTRAINT "recall_vacancies_idApplicant_fkey";
       public               postgres    false    230    4763    254            �           2606    280253 0   recall_vacancies recall_vacancies_idVacancy_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recall_vacancies
    ADD CONSTRAINT "recall_vacancies_idVacancy_fkey" FOREIGN KEY ("idVacancy") REFERENCES public.vacancies(id) ON UPDATE CASCADE ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.recall_vacancies DROP CONSTRAINT "recall_vacancies_idVacancy_fkey";
       public               postgres    false    254    252    4829            �           2606    280258     resumes resumes_idApplicant_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT "resumes_idApplicant_fkey" FOREIGN KEY ("idApplicant") REFERENCES public.applicants(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.resumes DROP CONSTRAINT "resumes_idApplicant_fkey";
       public               postgres    false    4763    256    230            �           2606    280263    resumes resumes_idPosition_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT "resumes_idPosition_fkey" FOREIGN KEY ("idPosition") REFERENCES public.positions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.resumes DROP CONSTRAINT "resumes_idPosition_fkey";
       public               postgres    false    256    4799    244            �           2606    280219 #   vacancies vacancies_idBusyness_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT "vacancies_idBusyness_fkey" FOREIGN KEY ("idBusyness") REFERENCES public.busynesses(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.vacancies DROP CONSTRAINT "vacancies_idBusyness_fkey";
       public               postgres    false    4789    234    252            �           2606    280224 #   vacancies vacancies_idCurrency_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT "vacancies_idCurrency_fkey" FOREIGN KEY ("idCurrency") REFERENCES public.currencies(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.vacancies DROP CONSTRAINT "vacancies_idCurrency_fkey";
       public               postgres    false    252    236    4791            �           2606    280214 #   vacancies vacancies_idEmployee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT "vacancies_idEmployee_fkey" FOREIGN KEY ("idEmployee") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.vacancies DROP CONSTRAINT "vacancies_idEmployee_fkey";
       public               postgres    false    4787    252    232            �           2606    280239 #   vacancies vacancies_idPosition_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT "vacancies_idPosition_fkey" FOREIGN KEY ("idPosition") REFERENCES public.positions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.vacancies DROP CONSTRAINT "vacancies_idPosition_fkey";
       public               postgres    false    252    4799    244            �           2606    280229 )   vacancies vacancies_idWorkExperience_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT "vacancies_idWorkExperience_fkey" FOREIGN KEY ("idWorkExperience") REFERENCES public.work_experiences(id) ON UPDATE CASCADE ON DELETE SET NULL;
 U   ALTER TABLE ONLY public.vacancies DROP CONSTRAINT "vacancies_idWorkExperience_fkey";
       public               postgres    false    248    252    4825            �           2606    280234 %   vacancies vacancies_idWorkFormat_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT "vacancies_idWorkFormat_fkey" FOREIGN KEY ("idWorkFormat") REFERENCES public.work_formats(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.vacancies DROP CONSTRAINT "vacancies_idWorkFormat_fkey";
       public               postgres    false    250    252    4827            �   �   x�E��
�0 �����ֿ�:OI�X��&e� (��n}�O��M�_O�x��	�@�kY��WW�y5~.�o$����}�֍Qc���}[mf��1�TA�m�?�nV���LY�XC�,`�g�� �f��@"0���B.A����D�A���8��&$-�      �   �   x�E�1N�0���9E�l���m�q&�Z�*Ѩ��X�ԅ��
Q�Ā�9��"	z��7�L���|��~����?��-��|�ްï?��}�����މ6��Hb	y�\=�wKW=�׭������"*kGB(B��I#.�ڎ�}��8~h���ª���ӗ��M��~9�:u��g�j&�g2�#"㢴��Tθ�RqC�*�� ��%� E����O�I���GL�� R�S`��\GA�}�WZ      �   �   x���M�0�u{
���П g�0�ڄ��7�&��g�w#�X��N�˼�{D�1 P��u�"ҚZڈB.�6��B�:��1��f�͏H�R��=c/��,��ek��>�#ic�&��>�U��2�͑��1�`揻�Hϛ�v�oF�Z�R3b�1&J���o��JI)����'      �   �   x�3估�¾��/츰H��
.6_�xa���GM{9��LuLt�ͭL-�,�����Hqq^�ra߅�@��b��V\���������\����iHR\Ɯ�^�t���>���`�44�362�j\�+F��� �iM"      �   �  x���[SWǟŧ�r�-�0s��7�1�\�e��jkf4#���	�x7Y;f��֦��v߷�@F	��W�O��}FB���S�rsn}���}�[��l��+$��j%W,�c�a#<��O«���"l�/�[!l�k"�}v{uh���v�O��W,T�2Q�	�P*Uc�f�
S5�0c_0�Y�b�p���7���N�'g]��0U6S�xv��W+���>�o�K٥E��d._\N,m���`Q,h��Q�w^JB�S����I����W���v�.(�K��S�W�L1���/��%i���1�֙�[�m����#�F�?�\G�eSg1&3]�5QVYgƸbK��)��ia������L������V���5�^?�����9��*<k�C�e����a[�?�-����ԃ轀��#��c��.u�&?�U/z�E�B�����CG �`��f�>�.��Ӱ����;�����0F~K�\¿�C���FCz/�N���h�lB�`Ǘ0���/0����C��V�!��j�^���@Ʒ"P�.��{M�B���Eb�S\�:��۴�k�܎6����5t�㖨z�_I�\!(Nd0��T�[1�2"��>�;Sfjv�X�^�u��.���S{�cSK��xM]��f����d�ќYN=K�À�H��S8���� �c0�����q��N�=�uT���@�Q�eS�l5-2��US6ml���9����[�jQcS�\>��+~)�����Ń�;(���#��t	�+���@F1.-�O��FSp�[}t���G����^򿺄6�>v� ��\8ZC4�3�s�CB��Ў��!S���o�S�����gߗd8�ۄ>�51��
�9Z�I[��@��4�۟��wv���:Pg~(ѷp�I�c3�^�� ��.m��&K���j*g��û�8�|u�ߟ��ū���H���Rnl�AJMdk��c�&-o6��={�Z/9C��s:��S�>�=�����;m� �wr�غ0����Ңfپhk����\�9�qVk\c�f)�p<�4���tn�)�_���s�i���t��6����I�>�#G��\��<�;��յM�=N�
'�9�/Hw�Դ���G�5���GߒT�@�/³9�2$�'$h�}�\	�Cyz_�tAh��q� ���SU���'�6}��pg\~��Y�'�o!�Ӝ��/)V�noK�?nA�<�Ė��SIa)�3+��ի{y��PM��������ɝ�R��k��|bn�jM�dÈ���j����ŧ���6�h�P�"z����l�DyU��2�Nh��L�N�>StQsY�m扊��(��:7�T�qٔt����=6GV̕+9����<LT�6���k	-�fH�Td|�4�`�(V���9�0U/�DCg\@�I�:D^�'�أ(��ԟG���ͻ~F��w�� n$�z�%����$��`��>������ݠJj�"��Dzۦ�緋+�N�.���|��M6�_ڛ ^�~�x٠Z*gX�C�� Uw�/�6ݔ�c�W���-;��&�㹚�{d��Aff}̿?�<==��� �9��ЪJj��A��/n��9OќcU��c;mx��٢f0�c�aK�4ѳGg�������%ɖv+ǃ�9�#Y�����K'�G���H�۰���CM�o|g����w���C��+B�AI�����֛I&t�ґ�}�K:�Z���7�gT\4��aW$@�S{(�
�h�U�?u������KG��t��"8����:�ny���%ƣ<����'�^��UM�D�>�IyU���Zp^f����B����S33���s�����7L�RVw�<����F�^@|C���KTò;�sM��M��Ȣ�԰.Ш(2�-�
<9�ɘ2�d`L����3OWg��j	�{�\F����Y_��_�W���% ��b�_1���ZC'�����)��\��{=�;�o!������!��!�E5FT-���
��������V��rnQ��<2��I����HB�"i���Wѭ�C����+,��<�I��*�F��	?](�2՘�YT�0��%yw�x:U�t�椇*��o&d6��̅���ޟN��˵�io���ll�`������j�jH�M�ߤ��y���(�pL�i9*K˚k��f��1Ct=�	թ�zir�MٸlH�b�B�PӈKk^֩�\�/��%�3.s�f|���(�RK����{��Q.Z��n4`�QT�r"D��w��9V�QEˑ���QRyR%m�������Uf�� HF\P�B+�1E��K��su���wO�i���y��Y�?K�KQb�Q��ozo��|�kQ���7i|۠#����C��*�w>�ѕ���$�WM�/�\�ʛ����\�7=�лF�V�95��D�G��Nf���A=P��X4ie�I�('�3K�^qv��4�`�,��*�L�ٝ�>��g�Ii�0|)yͻp�C��P��
��
6ʏ�8��JxC)� ��Kս�%�ɮf�L�}ك뚪��&;������ij��kڸjJ�q�d7�ر��q�}_�_H;�X���A����E��;(H�G2rR�*2�{��੨ɟ�(��/�^,�0��Ǎs�K����X>���u���[�5u:3���a�@���Lʘ����-N��5E_{��Y{�|�SƒOV3�ӏ����x��t[5Ң�6!��뉎��b�k�e��jx3�&փ6�-�CM#���D��s��2r��gU�ɸ����!��=MF]��{�)Oy��=G9�,z����g�������b�RY�\M�ٳ-5S��V$�p[��=���k�+Y��ݲS��Z1���+������;��@�|�+�h�"Z�u���a�G�tZ��?-:�分���m[1o���
�#��ec�2�ȒB���FFF�����      �   �  x�}TKn�0\˧ྎ!9N��,�d�h��$q�6dբm�@;��H�|�
=Ig���:i�D�q޼y�%Y���~�?;��5~��u�+��n\�I��o8�#���V��5���3�'gI7힝���43iw�������o������p���u˘���%7r����V��|�tq��^"���ٻד�Z��y�~�BaS`�j�u�P�_����d�]~����~����,{� �[��.G>W�����_ѵk���a]X�ӏ����� X�2��P~�lz�~rWJ���>����\�����w�,�꧸԰�#�.�R��(�c�/j�j��xc�"��?�FA�JI\ʁ6���<�J���A.5d�g�*��p�J�Y�R�b��L���
}#�+�qȲ������8���Ϲ��;�C0�rX� )�j�b*�~����<�A�q�>.��L]�R7�~�?�� B���8�?a�(��VA���z#ߍ�dȔ2&G-�2�岈Tׄ( �Dz��V�E�I=�����ZnB�m�Z��]l�$�Y�
��D)��}_徣1��P�A�P�U(��:�G'� ���&�Ua.,k�h �ƃa�
�!B�7T#z��>a�&� �`�m|I%����<�	¬��
�D������"�/�NI��9�|TM1�ؿz�s�ǙߋA���׳?襃^��}�?~=�>j��Z�?���      �   �   x�}ͱ�0��ڞ�=�����,ԁ ��fF0"H�ș�y#�D.��Oz?)R�!����.(���bP��|<�	`��/TuV�8��M)���R�;7�4%�6F��/��l��("[[�p~���7��FJao�bW�H���0a�      �   �  x�ݘ�n�Fǯ=O1����᯽K��T�n\g��ٵW^/(w!�HH� O�D��[^a�F=�`�lv& �"�Y{����3s�sl�PG�T��5��@�����:�^��<+e���ȇr�Od�ՉzۛjO����#�s��z��?����e����ա��\�]t�E�b��?p)a¿�r����,|?��Nox�pO��k%�n���1&���tZv�Qjb����ɇ7'S|5�J3�m�8q_�J�s<��k����i��u�F#�������"�]&%^��x�k8F��P��[k=�(�Q�
��6ܝ�r��6�i�P�e�1�G��ZB�Y��bG�i���������硉PK�R��2�R[���Idk-!j��l8{ugA��D?Úײx���(�(3�i	Q�3_��^�X�+Z+!jw柊x��&�x� ��LxZBԷ��ڬ��q��Ym���y�1tZB4�Z�Y>ʋ��F֏��NK��V�^�ٓ�	���VB̵:�mÒۋ�x�5L��
b��v��6̷��hdX4Z	1fu��8ن���˸��孏���ң������x*��<"hd��b�j�y�-}��G<a����0)fcp(�:F�}CI�J�ٍy(�Y���=; 0�_+!f7��h�)�;=Y��=�<n%D�][]�T}_��Q�,���4ÌPJ�K��twd���I<��`���$b�B;�z�p���@���ch����}�� � ����px����wcs�	��h�58y�����=��Ϋ�뤹��c���	t7s�������]V�4��U�kdݜ�A�8h8�#�q�C�� xV=���>4��_�wk��aڞ���` ĀCҰ�o�Z������f�46p"�*�3b�7�����C�,��i	����֧(E��� ��_�]�{M����a���<+��]�����EH�3�����<���a��N�t��K�R!qͳ����%%.;�A����>      �   k  x�}�OJ�@��3��R���7I��"(�)�pSjE�b��Z7��� �֦��+���/k�c��������D����n�tO}ۇ&��;���Ì�ɥ����8����b�[\�AT��V�l����k�)�
���[i�;jw�n�饄��-C&#�-դ�\^�|�3�7�8�}�Oi�k�ӷD�x�����پ���N�� �Co�q��*�C&��!4 ���枏�&����y�d�VN�Ѱța�j�x�x���L��q�*�F� �ר���=L=�9��%*NAQ�eS�.�Z#�����(�a�����qY�f�pm^Q�	<c��y�iC{W�S�Q*L��*��0J�1��      �   �   x�}�1�0�99E�
�ߎd���Pԡ�?G]T�"/�z�2�<N�c��a��Sø�H����Oӎ���/��F�RNQ�p����=N��T�ma��NBa!�ͱ�Ia����2����Ց�A�|YA&��x�b-�u��:j�:��嵧�zv�Q\(��SRP      �   �   x�}��N�0�g�)�'�������!�6X
e�B!$v���*���}#�a��"˲tϱ�}VYY���X(ܣG�5�+l�抧<���x"i���ޢO0����D��''����X9���d��d\�6�.-|q`���S�Cg%�N��;�/��+lH>�_	hM<�/�E�74�6�H����(%�	W�,��<�a%�H��%,	b}M�E��c7*˳�0�i��]z�ߖ��>J�֟$`Ķ      �   t	  x��Y[S�~~E?:fz�zS��e��lR嗉@k!Q�ؔ�0`�S��f+y�l��n~�,$�������sN�H#��&�*����_��Ӷf��	a=d�B1*׋��&��!z�#~a����<>�_1�a�L4�7p
���f���߈6舶��&N`��������xn:�]M�nh���%]щ�`�;���ә��z`�9Z]3���}=]|��[[\и��9Þ3Lf���خ�������,gf��y�t�Ù����x��F�m��0���h�'��2�G����. �q6 fC{�Xs�9~��M8,���G+�����fL[�gd\N���3��9��8�-D_����by�X��*�ZGC��0��-���  �cCF`�a��C�s�����H�i����܆�p���=q����&�ć>U�x�,392cJf\�Z^YX|�][Zy|[n�,w3����s�j|8Q�h_,��G�Պ�e�� �e�4�(�<�sh�}�4-�8Y��:��#�n���#�y����<�N���"}��I���M�`{�Kn���j���WQ�Ζ�r���&$p�^�climN�#��$+���.���WY��F|d��IC6��Qq�ڇ����I6e�ʽТ(��������|".���=�b;�4�q��= �aN�#@�c���>N�e di���-�B���k���h�WÝ�b�:� ���oʱ�ki�`�=	|ʖ+c��ۺ�؈8 ,�W��/j�h�e׷�eH#հ^�?/��cp��&m���1�O�����1��I���e�y��\bV+�[[���=�vL�WH `�(N�rX}Ջ�M�߉
ŰD9���c� �����dH���l��Y����2�1�WF.M�#���ky���̉�q
vs�r� P]�o�{@٩Cc�n�.<'�q� ۆ�Z$9�p�K���G��x���L)����՝���+��臻�b��>��u�믣Re�����Ƌ陒0q�E�����-&��4b��p%�]��Β
�����4l��Z��\�G��wa���oa���}�~���>)�8�����x����v�|�-���\<H�%�sc��n��L�R��Ӳ���vX/V��I�p�A��7�d%/d:�0�_���LT2E�=Q�v|����t�c޹Rew=���Hd�/���V1$���P�J�LdѶnY2'��B-��2�k�{&���O��"c��D�)��,���@��4��=���T�_[?��m3-�.(2���d�Ts�2gkr�n@�-sP�qJ�a�H��x������`Z�������P�ؼ&a��Bz�WkAӆrP�M�<ܐ����ݵ��U.���Z�#���WwI��$:*���Kw��cj:�L�U��!�$�Rt=�B(unH��լ�v:*����'�i��+���KW_Է _�$0�t�:MRdGʃ����gˡN�D�̀$!O��l#-��-7�QV˨��S��4,?ª5r���N�s4����-��&�)oZI�&��k�Ւg\V�?��q��y���]7Ɓ(�Z�2���1��Bה�r�L�����Sʓ���2������-�Buw*���`��(��6!.�,�"�n�C���ȻW�Ŝ�/�.%A.ի��-�����E��]]��c��&�uA�UV��W�*ښS��seЕb�T}��G�����|H�a��,�0���>%��B�D[�P7��Ӕ8Sʚ.�Y{�t�+�~}��^\����s�V�ѵM�1L7�zӒ�\���\uTVWsCd^��B��Wv����S=����J�5��V���#<]	�~��ϭ�hؽ�-P�,�������P3�� �Hs�];��*��u���m�n@�CK)\k�L���-c�귓�#��t��q_:���`&dڹG��j��Ϭ��,����颌cv�i"��i��NC�W�#�����%��I�:�$�VR��E��a �^��%�.�"7쪴�����ǒ2�y_�Y�Y���__Bh�K�IXb,D'Qk�c*� 3�Z8k�2Z[�Α ��s������һ��l�P~��XT��=xX����O�ݵ*�@��6�?b�8F�zN��C������y`�BO���t�L|R�����3C���Kw�1��N�&�}<=�Q��
��v���*�Rm���j)��V\_/EU� ����`���K��@���Q	��H&O�Ӑ	���kg�����"�صe/c�n��YƄ4P%\z���B�����6�߆'6h;�lҝ��e�=�P<rj�rGV��/�[�ɿ�[|'F��^}'�ۀ4�{֘�i���nS?�r��h	�d\��o��!���j�N|���	�8�������#1uC���333���rv      �   �   x�}�A
1��us��eJ���ӳx��+�"�A��zOb7B���'�2nO�ʾ�8e����2'٤\�b�'�y���R�k�L��M���$��Wf�x ��ݔ�jY�,���Q���e7�t�%����"S�      �   R   x�3�0�b˅9��LuLt�����LL���Hqq^X|a˅v_�xa/�â�R��A0)�=... �|&�     