--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-10-20 14:35:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 49430)
-- Name: dog_temperaments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dog_temperaments (
    "dogId" uuid NOT NULL,
    "temperamentId" integer NOT NULL
);


ALTER TABLE public.dog_temperaments OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 49970)
-- Name: dogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dogs (
    id uuid NOT NULL,
    nombre character varying(255) NOT NULL,
    altura character varying(255) NOT NULL,
    peso character varying(255) NOT NULL,
    lifetime character varying(255),
    image character varying(255),
    grupo character varying(255),
    funcion character varying(255),
    "creadoDB" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.dogs OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 49424)
-- Name: temperaments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temperaments (
    id integer NOT NULL,
    nombre character varying(255)
);


ALTER TABLE public.temperaments OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 49423)
-- Name: temperaments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temperaments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.temperaments_id_seq OWNER TO postgres;

--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 221
-- Name: temperaments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temperaments_id_seq OWNED BY public.temperaments.id;


--
-- TOC entry 3184 (class 2604 OID 49427)
-- Name: temperaments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperaments ALTER COLUMN id SET DEFAULT nextval('public.temperaments_id_seq'::regclass);


--
-- TOC entry 3334 (class 0 OID 49430)
-- Dependencies: 223
-- Data for Name: dog_temperaments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dog_temperaments ("dogId", "temperamentId") FROM stdin;
3a0d96a5-97f7-40b6-964a-86be45c49349	6
3a0d96a5-97f7-40b6-964a-86be45c49349	15
3a0d96a5-97f7-40b6-964a-86be45c49349	94
3a0d96a5-97f7-40b6-964a-86be45c49349	49
\.


--
-- TOC entry 3335 (class 0 OID 49970)
-- Dependencies: 224
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dogs (id, nombre, altura, peso, lifetime, image, grupo, funcion, "creadoDB") FROM stdin;
03cc2ce9-f64c-4164-8d99-3c63a62bbe7d	Doge	20 - 24	28 - 30	\N	\N	\N	\N	t
\.


--
-- TOC entry 3333 (class 0 OID 49424)
-- Dependencies: 222
-- Data for Name: temperaments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.temperaments (id, nombre) FROM stdin;
1	Curious
3	Stubborn
6	Fun-loving
7	Aloof
11	Happy
15	Outgoing
16	Friendly
20	Courageous
21	Loyal
22	Brave
25	Composed
29	Protective
30	Trainable
33	Gentle
34	Affectionate
37	Dominant
38	Strong Willed
39	Obedient
41	Reserved
43	Sweet-Tempered
45	Attentive
46	Steady
47	Proud
51	Lively
56	Spirited
62	Joyful
63	Agile
64	Amiable
67	Self-confidence
71	Watchful
75	Sensitive
79	Lovable
80	Territorial
82	Familial
85	Quick
86	Powerful
88	Stable
90	Inquisitive
93	Patient
95	Great-hearted
96	Merry
98	Tolerant
100	People-Oriented
104	Boisterous
108	Respectful
110	Generous
112	Sturdy
116	Opinionated
117	Aggressive
119	Charming
122	Diligent
4	Playful
5	Active
8	Clownish
9	Dignified
13	Hardworking
14	Dutiful
18	Confident
19	Intelligent
24	Responsive
27	Faithful
28	Loving
31	Responsible
32	Energetic
35	Devoted
36	Assertive
40	Reserved
42	Kind
44	Tenacious
48	Bold
49	Reliable
52	Cautious
53	Self-assured
54	Eager
57	Companionable
59	Rugged
61	Refined
65	Excitable
66	Determined
70	Good-tempered
74	Cheerful
76	Easygoing
78	Trusting
81	Keen
84	Bright
87	Gay
89	Quiet
91	Strong
92	Sociable
94	Suspicious
99	Mischievous
101	Bossy
102	Cunning
105	Cooperative
106	Trustworthy
107	Self-important
113	Benevolent
115	Bubbly
118	Extroverted
120	Unflappable
2	Adventurous
10	Independent
12	Wild
17	Alert
23	Docile
26	Receptive
50	Fearless
55	Good-natured
58	Even Tempered
60	Fierce
68	Hardy
69	Calm
72	Hard-working
73	Feisty
77	Adaptable
83	Rational
97	Vocal
103	Athletic
109	Thoughtful
111	Cat-like
114	Clever
121	Spunky
123	Willful
124	Fast
125	Vigilant
\.


--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 221
-- Name: temperaments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temperaments_id_seq', 125, true);


--
-- TOC entry 3189 (class 2606 OID 49434)
-- Name: dog_temperaments dog_temperaments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dog_temperaments
    ADD CONSTRAINT dog_temperaments_pkey PRIMARY KEY ("dogId", "temperamentId");


--
-- TOC entry 3191 (class 2606 OID 49977)
-- Name: dogs dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);


--
-- TOC entry 3187 (class 2606 OID 49429)
-- Name: temperaments temperaments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperaments
    ADD CONSTRAINT temperaments_pkey PRIMARY KEY (id);


--
-- TOC entry 3192 (class 2606 OID 49440)
-- Name: dog_temperaments dog_temperaments_temperamentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dog_temperaments
    ADD CONSTRAINT "dog_temperaments_temperamentId_fkey" FOREIGN KEY ("temperamentId") REFERENCES public.temperaments(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-10-20 14:35:41

--
-- PostgreSQL database dump complete
--

