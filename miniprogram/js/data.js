const categories = [{
  value:'学习',
  id:'learn'
},{
  value:'数码',
  id: 'digit'
},{
  value:'食品',
  id:'food'
},{
  value:'化妆品',
  id:'cosmetics'
},{
  value:'衣服',
  id:'cloth'
},{
  value:'其他',
  id: 'other'
}]

const clauseInfo = `
<div class="clause">
<h1 class="title">HUST跳蚤市场服务条款</h1>
<h2 class="title">一、账户使用</h2>
<h3 class="title">1.1 用户资格</h3>
<p>您确认，在您开始使用HUST跳蚤市场服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力则您及您的监护人应依照法律规定承担因此而导致的一切后果。</p>
<h3 class="title">1.2 账户说明</h3>
<p>鉴于HUST跳蚤市场服务系基于您的微信账户为您提供，您有权使用您的微信账户登录HUST跳蚤市场并使用相关服务，您的账户仅限本人使用。</p>
<h2 class="title">二、HUST跳蚤市场服务及规范</h2>
<p><strong>【服务概况】</strong>您有权在HUST跳蚤市场上享受闲置资源信息的浏览、收藏、信息交流等服务。</p>
<h3 class="title">2.1 闲置商品/服务信息的浏览、收藏</h3>
<p>在您浏览HUST跳蚤市场的过程中，HUST跳蚤市场为您提供了信息分类、关键词检索、筛选、收藏及关注等功能，以更好地匹配您的需求。您可以对您感兴趣的闲置商品/服务进行收藏。</p>
<h3 class="title">2.2 发布闲置商品/服务等信息</h3>
<p>通过HUST跳蚤市场提供的服务，您可通过文字、图片等形式在HUST跳蚤市场内直接发布闲置商品/服务信息。您声明并保证，您对您所发布的信息拥有相应、合法的权利，您所发布的信息及实施的行为均符合相关法律法规、国家强制性标准要求及本协议约定，并且您对您发布的信息负有管理义务，对其中您违反相关法律法规规定及本协议约定的信息应立即删除，否则，HUST跳蚤市场可对您发布的信息及账户依法或依本协议采取必要处置措施。</p>
<p>您应当确保您所发布的信息不包含以下内容：</p>
<p class="list">（一）违反国家法律法规禁止性规定的内容；</p>
<p class="list">（二）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的内容；</p>
<p class="list">（三）欺诈、虛假、不准确或存在误导性的内容</p>
<p class="list">（四）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的内容</p>
<p class="list">（五）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的内容；</p>
<p class="list">（六）存在可能破坏、篡改、删除、影响HUST跳蚤市场任何系统正常运行或未经授权秘密获取HUST跳蚤市场及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的内容；</p>
<p class="list">（七）其他违背社会公共利益或公共道德或依据HUST跳蚤市场相关协议、规则的规定不适合在社区内发布的内容。</p>
<h3 class="title">2.3 用户行为规范</h3>
<p>在使用HUST跳蚤市场发布商品时，您应当按页面提示准确完整地提供您的信息，以便其他用户了解商品详情并与您联系。您了解并同意，您有义务保持提供信息的真实性、 有效性。</p>
<p class="list">(一）不得发布垃圾广告。</p>
<p class="list">(二）不支持闲置物品描述与实际不符的发布行为。</p>
<p class="list">(三）不得在发货或者退货时，故意调换闲置商品或偷换零件。</p><p class="list">(四)不得在交易产生后，以牟利或借机进行敲诈勒索为目的的恶意行为，或者进行其他明显违反平等、公平、自愿等交易原则的违法违规行为。</p>
<p class="list">(五）不得进行骗取他人财务的欺诈行为。</p>
<p class="list">(六)不得频繁异常地发生交易纠纷导致他人资损。</p>
<p class="list">(七)不得发布和交易国家法律法规不允许交易或者需要特殊资质方可交易的商品(包括但不限于枪支弹药、香烟、药品等)。</p>
<p class="list">(八）不得发布成人用品、正在流通和错版人民币。</p>
<p class="list">(九）不得发布拉人炒信的兼职广告商品信息。</p>
<p class="list">(十）不得发布假货。</p>
<p class="list">(十一）不得发布存在交易风险的虚拟商品信息。</p>
<p class="list">(十二）不得发布泄露他人隐私的内容。</p>
<p class="list">(十三）不得以侮辱、诽谤等方式对他人进行人身攻击。</p>
<p>如您违反国家法律法规规定及以上规则发布和交易禁发禁售商品或存在恶意行为的，平台将无法保障您的权益，且有权对您进行相应处罚，包括但不限于限制账号功能、封禁账号。对于用户存在的涉嫌违法犯罪的行为，平台将移交司法机关进行处理。</p>
<h2 class="title">三、用户信息的保护及授权</h2>
<h3 class="title">3.1 个人信息的保护</h3>
<p>HUST跳蚤市场非常重视用户个人信息的保护，在您使用HUST跳蚤市场提供的服务时，您同意HUST跳蚤市场按照在HUST跳蚤市场上公布的隐私权政策收集、存储、使用、披露和保护您的个人信息。HUST跳蚤市场希望通过隐私权政策向您清楚地介绍HUST跳蚤市场对个人信息的处理方式，因此HUST跳蚤市场建议您完整地阅读隐私权政策，以帮助您更好地保护您的个信息。</p>
<h3 class="title">3.2 非个人信息的授权</h3>
<p><strong>【授权使用】</strong>对于您提供、发布及在使用HUST跳蚤市场服务中形成的除个人信息外的文字、图片、视频、音频等非个人信息，均不会因上传、发布等行为发生知识产权、肖像权等权利的转移。除非我们另行说明。在法律允许的范国内，您免费授予HUST跳蚤市场及其关联公司非排他的、无地域限制的许可使用（包括存储、使用、复制、修订、编辑、发布、展示、翻译分发上述信息或制作派生作品，以已知或日后开发的形式、媒体或技术将上述信息纳入其它作品内等）再许可第三方使用的权利。以及可以自身名义对第三方侵权行为取证及提起诉讼的权利。</p>
</div>
`

module.exports = {
  categories, clauseInfo
}