import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.log('\nPlease add this line to your .env.local file:')
  console.log('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here')
  console.log('\nGet it from: Supabase Dashboard → Settings → API → service_role (secret)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const articles = [
  {
    title: "Harvey AI Confirms $8 Billion Valuation Following $160M Funding Round Led by Andreessen Horowitz",
    slug: "harvey-ai-8-billion-valuation-160m-funding-2025",
    excerpt: "Legal AI startup Harvey has reached unicorn status with an $8 billion valuation, securing $160 million in fresh funding as more than half of the top 100 law firms adopt its LLM-based legal assistant.",
    content: `Legal AI startup Harvey confirmed on December 4, 2025, that it has closed a major funding round led by Andreessen Horowitz, valuing the company at $8 billion. The $160 million raise marks a significant milestone for the company, which has positioned itself as the leading AI assistant for legal professionals.

Harvey's rapid ascent comes as the legal industry increasingly embraces artificial intelligence for routine tasks. The company's LLM-based platform can draft legal documents, conduct research, and analyze case law, freeing lawyers to focus on higher-value strategic work.

According to the company's announcement, Harvey has been adopted by more than half of the top 100 law firms globally. This widespread adoption among elite legal practices demonstrates growing confidence in AI's ability to handle sophisticated legal work while maintaining accuracy and compliance with professional standards.

The funding round reflects investor enthusiasm for specialized AI applications in professional services. Legal AI represents a particularly promising market due to the industry's document-intensive workflows and high billing rates, which create strong economic incentives for automation.

Andreessen Horowitz, known for backing successful AI companies including OpenAI and Anthropic, led the round. The venture capital firm has made enterprise AI a core focus of its investment strategy, betting that vertical-specific AI tools will capture significant value as businesses move beyond general-purpose chatbots.

Harvey's $8 billion valuation places it among the most valuable AI startups globally, though still well behind industry leaders like OpenAI and Anthropic. The company plans to use the fresh capital to expand its platform capabilities and increase its sales team to capture more of the legal market.

The legal AI market has attracted significant competition, with companies like Casetext (acquired by Thomson Reuters) and EvenUp also developing AI tools for lawyers. However, Harvey's success in winning over top-tier law firms suggests it has established a defensible market position in the premium segment of the industry.`,
    published_at: "2025-12-04T10:00:00Z",
    is_featured: true,
    seo_title: "Harvey AI Reaches $8B Valuation with $160M Funding | AI News",
    seo_description: "Legal AI startup Harvey confirms $8 billion valuation after $160M funding round led by Andreessen Horowitz. Over half of top 100 law firms now use the platform."
  },
  {
    title: "Google Launches Gemini 3 Pro with 'Generational Leap' in Vision AI, Surpassing 650M Monthly Users",
    slug: "google-gemini-3-pro-vision-ai-650m-users-2025",
    excerpt: "Google unveiled Gemini 3 Pro on December 5, 2025, calling it a breakthrough in visual and spatial reasoning that moves beyond simple recognition, as the Gemini app crosses 650 million monthly users.",
    content: `Google announced Gemini 3 Pro on December 5, 2025, describing the release as a "generational leap from simple recognition to true visual and spatial reasoning." The new model represents Google's most capable multimodal AI system to date, delivering state-of-the-art performance across document understanding, spatial reasoning, screen interaction, and video analysis.

Gemini 3 Pro sets new benchmarks on leading vision AI tests, including MMMU Pro and Video MMMU. The model can reason across text, images, audio, and video simultaneously—a capability that Google says enables more natural and powerful AI interactions than previous generations.

The launch comes as Google reports explosive growth in its AI products. The Gemini app has surpassed 650 million users per month, while AI Overviews in Google Search now reaches 2 billion users monthly. These figures underscore the rapid mainstream adoption of generative AI tools just three years after ChatGPT's debut.

Google is rolling out Gemini 3 Pro immediately to all users of the Gemini app. The company says the model brings "state-of-the-art reasoning" and represents their "best vibe coding model yet," suggesting improvements in both analytical capabilities and user experience.

Additionally, Google AI Ultra subscribers now have access to Gemini 3 Deep Think, the company's most advanced reasoning mode. Deep Think uses iterative rounds of reasoning to explore multiple hypotheses simultaneously, making it particularly effective for complex tasks in mathematics, science, and logic.

The competitive impact of Gemini 3 has been immediate. OpenAI CEO Sam Altman reportedly declared a "Code Red" in an internal memo following Google's release, marshaling resources to improve ChatGPT in response to the competitive threat. Salesforce CEO Marc Benioff praised Gemini 3 on social media, calling the improvements in "reasoning, speed, images, video" insane.

Google's aggressive deployment strategy—what the company called its "fastest-ever" rollout into Google Search—demonstrates the tech giant's determination to reclaim leadership in the AI race after initially ceding ground to OpenAI's ChatGPT.`,
    published_at: "2025-12-05T08:00:00Z",
    is_featured: true,
    seo_title: "Google Gemini 3 Pro Launch: Vision AI Breakthrough | AI News",
    seo_description: "Google launches Gemini 3 Pro with advanced vision AI capabilities. Gemini app reaches 650M monthly users as Google competes with OpenAI."
  },
  {
    title: "Chinese AI Lab DeepSeek Unveils V3.2 Model Claiming GPT-5 Performance at Lower Cost",
    slug: "deepseek-v32-china-ai-gpt5-performance-2025",
    excerpt: "DeepSeek released its V3.2 AI model on December 1, 2025, claiming performance matching OpenAI's GPT-5 while introducing tool-use capabilities that allow the model to operate search engines, calculators, and code execution tools.",
    content: `China's DeepSeek unveiled two new experimental AI models on December 1, 2025, with the flagship DeepSeek-V3.2 claiming to match the performance of OpenAI's GPT-5 across multiple reasoning benchmarks. The release marks the latest challenge from Chinese AI labs to Western dominance in frontier AI models.

DeepSeek-V3.2 goes beyond pure reasoning by integrating tool-use capabilities, allowing the model to operate search engines, calculators, and code execution tools autonomously. This agentic functionality represents a shift from models that only generate text to systems that can take actions and interact with external systems.

Alongside the main release, DeepSeek introduced DeepSeek-V3.2-Speciale, a variant tailored specifically for mathematical reasoning and complex problem-solving. According to the company, Speciale aims to "push the inference capabilities of open-source models to their limits." The specialized model is currently available only via API through a temporary endpoint that expires on December 15, 2025.

The timing of DeepSeek's release is notable, coming just days after OpenAI faced competitive pressure from Google's Gemini 3 launch. The AI race has become increasingly global, with Chinese labs like DeepSeek demonstrating they can produce models competitive with the flagship offerings from Silicon Valley giants.

DeepSeek has positioned itself as a leader in open-source AI development, releasing model weights and technical documentation to researchers. This approach contrasts with the increasingly closed strategies of OpenAI and Google, which have limited external access to their most advanced models citing safety and competitive concerns.

Industry observers note that Chinese AI labs have made rapid progress despite U.S. export controls on advanced chips. DeepSeek and competitors like Alibaba's Qwen team have focused on efficiency improvements, developing techniques to train and run powerful models on less capable hardware.

The release puts additional pressure on Western AI labs to maintain their technological edge. With Chinese models claiming comparable performance at potentially lower computational costs, the competitive dynamics of the AI industry continue to shift rapidly.`,
    published_at: "2025-12-01T14:00:00Z",
    is_featured: true,
    seo_title: "DeepSeek V3.2: Chinese AI Challenges GPT-5 | AI News",
    seo_description: "Chinese AI lab DeepSeek releases V3.2 model claiming GPT-5 level performance with tool-use capabilities and lower computational costs."
  },
  {
    title: "AWS Unveils Trainium3 UltraServers and Frontier Agents at re:Invent 2025, Promising 40% Energy Reduction",
    slug: "aws-reinvent-2025-trainium3-frontier-agents",
    excerpt: "Amazon Web Services announced Trainium3 UltraServers and three new frontier agents—autonomous AI systems that can work for hours or days without intervention—at its re:Invent conference from December 1-4, 2025.",
    content: `Amazon Web Services unveiled major AI infrastructure and software announcements at its annual re:Invent conference, held December 1-4, 2025 in Las Vegas. The centerpiece was Trainium3, AWS's latest AI training chip, packaged in a new UltraServer system that promises up to 4x performance gains for both AI training and inference while reducing energy consumption by 40%.

The energy efficiency improvements come as AI's environmental impact faces increasing scrutiny. Training and running large language models requires massive data centers consuming enormous amounts of electricity. AWS's claim of 40% energy reduction could significantly lower the carbon footprint and operating costs of AI systems.

AWS also announced that Trainium4 is already in development and will feature interoperability with Nvidia's chips. This cross-compatibility represents a notable shift, as cloud providers have historically built proprietary chip ecosystems that lock customers into specific platforms.

Beyond hardware, AWS introduced what it calls "frontier agents"—a new category of autonomous AI systems that represent "a step-change in what agents can do." Unlike current AI assistants that handle brief interactions, frontier agents can work autonomously for hours or days without human intervention.

The company announced three frontier agents: Kiro autonomous agent for general tasks, AWS Security Agent for cybersecurity operations, and AWS DevOps Agent for infrastructure management. These systems can plan, execute multi-step workflows, and make decisions without constant human oversight.

AWS also revealed Graviton5 processors, described as the company's most powerful CPU to date, and Amazon Bedrock AgentCore, a development framework for building custom autonomous agents. The AgentCore platform allows enterprises to create specialized agents for their specific business processes.

The announcements position AWS to compete more aggressively with Microsoft Azure and Google Cloud in the AI infrastructure race. As enterprises move from experimenting with AI to deploying it at scale, cloud providers are competing on performance, cost efficiency, and developer tools.

Industry analysts view the frontier agents announcement as particularly significant, suggesting that autonomous AI systems could become the next major category of enterprise software, automating complex workflows that currently require human expertise.`,
    published_at: "2025-12-04T16:00:00Z",
    is_featured: false,
    seo_title: "AWS re:Invent 2025: Trainium3 & Frontier Agents | AI News",
    seo_description: "AWS announces Trainium3 UltraServers with 40% energy reduction and frontier agents at re:Invent 2025. New autonomous AI systems work for hours without intervention."
  },
  {
    title: "Meta Signs AI Data Agreements with CNN, Fox News, and Other Publishers to Offer Real-Time News on Meta AI",
    slug: "meta-ai-news-deals-cnn-fox-publishers-2025",
    excerpt: "Meta announced commercial AI data agreements with major news publishers on December 5, 2025, including CNN, Fox News, USA Today, and Le Monde, to power real-time news capabilities in its Meta AI chatbot.",
    content: `Meta has signed commercial AI data agreements with multiple major news publishers to provide real-time global, entertainment, and breaking news through Meta AI, its chatbot integrated across Facebook, Instagram, and WhatsApp. The partnerships, announced December 5, 2025, include CNN, Fox News, Fox Sports, Le Monde Group, People Inc., The Daily Caller, The Washington Examiner, and USA Today.

The deals represent a significant shift in how AI companies access news content for training and operating their systems. While many AI firms have faced legal challenges over using copyrighted content without permission, Meta is pursuing formal commercial agreements that compensate publishers for their journalism.

Meta AI will use these partnerships to deliver current news updates when users ask about breaking events or recent developments. The chatbot can now provide timely information about sports scores, political developments, and major news events, drawing from a diverse set of news sources spanning the political spectrum.

The agreements come as publishers grapple with AI's impact on their business models. While some news organizations have sued AI companies for copyright infringement, others are pursuing licensing deals that generate new revenue while giving AI systems access to high-quality, authoritative information.

For Meta, the news partnerships address a key limitation of large language models—their training data has a cutoff date, meaning they cannot provide information about recent events without access to current data sources. Real-time news capabilities make AI chatbots more useful for everyday queries about current events.

The publisher lineup reflects Meta's apparent strategy to include diverse political perspectives, partnering with both left-leaning outlets like CNN and right-leaning sources like Fox News and The Daily Caller. This approach may help Meta deflect criticism that its AI systems exhibit political bias.

Financial terms of the agreements were not disclosed, but the deals likely involve both upfront payments and ongoing royalties based on usage. Similar agreements between OpenAI and publishers have ranged from low millions to tens of millions of dollars annually.

The news partnerships follow similar deals by OpenAI, which has signed licensing agreements with The Associated Press, Axel Springer, and other publishers. As AI systems become primary interfaces for information access, control over news content is becoming an increasingly valuable asset for publishers.`,
    published_at: "2025-12-05T12:00:00Z",
    is_featured: false,
    seo_title: "Meta AI Signs News Deals with CNN, Fox News | AI News",
    seo_description: "Meta announces AI data agreements with CNN, Fox News, USA Today and other publishers to bring real-time news to Meta AI chatbot."
  }
]

async function seedArticles() {
  console.log('🚀 Starting article seeding...\n')

  // First, get or create the AI News category
  let { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'ai-news')
    .single()

  if (!category) {
    console.log('Creating AI News category...')
    const { data: newCategory, error: catError } = await supabase
      .from('categories')
      .insert({
        name: 'AI News',
        slug: 'ai-news',
        description: 'Latest news and updates from the AI industry'
      })
      .select('id')
      .single()

    if (catError) {
      console.error('Error creating category:', catError)
      return
    }
    category = newCategory
  }

  console.log(`✅ Using category ID: ${category.id}\n`)

  // Insert articles
  for (const article of articles) {
    console.log(`📝 Inserting: ${article.title.substring(0, 50)}...`)

    // Remove is_featured since it might not exist in the table
    const { is_featured, ...articleData } = article

    const { error } = await supabase
      .from('articles')
      .insert({
        ...articleData,
        category_id: category.id,
        status: 'published',
        ai_generated: true
      })

    if (error) {
      if (error.code === '23505') {
        console.log(`   ⚠️ Article already exists (slug: ${article.slug})`)
      } else {
        console.error(`   ❌ Error:`, error.message)
      }
    } else {
      console.log(`   ✅ Success!`)
    }
  }

  console.log('\n🎉 Seeding complete!')
}

seedArticles()
